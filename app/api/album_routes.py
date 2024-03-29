from flask import Blueprint, session, request, jsonify
from flask_login import current_user
from app.models import db, Album, Photo, photoalbums
from flask_login import login_required
from app.forms.album_form import AlbumForm
import app.models
from app.awsS3 import allowed_file, upload_file_to_s3, get_unique_filename, remove_file_from_s3


album_routes = Blueprint('albums', __name__)

@album_routes.route("/all")
@login_required
def all_albums():
    all_albums = Album.query.filter_by(userId=current_user.id).all()
    album_list = [
        {
            "id": album.id,
            "title": album.title,
            "description": album.description,
            "userId": album.userId,
            "image_url": album.image_url,
            "photos": [photo.to_dict() for photo in album.photos],
        } for album in all_albums
    ]
    return jsonify(album_list)


# # Get details of all the photos present in an album by album id
# @album_routes.route('/<int:id>')
# @login_required
# def get_album_by_id(id):
 
#     album =  Album.query.get(id)

#     all_photos = list(db.session.query(photoalbums).filter_by(albumId=album.id).all())
#     photo_array = [] 
#     for photo in all_photos:
#         (photoId,albumId) = photo 
#         photo_details = Photo.query.get(photoId)
#     #     print('######################',photo_details.to_dict())
#         photo_array.append(photo_details.to_dict())
#     # print('^^^^^^^^^^^^^^',photo_array)

#     all_photos = photoalbums.query.filter_by(albumId = album.id).all
#     photo_details = Photo.query.get(photo.id) 

#     detailed_album = {   
#             'id': album.id, 
#             'title': album.title,
#             'description': album.description, 
#             'userId': album.userId,
#             'image_url': album.image_url,
#             'photos' : photo_array  
#     }
#     # #print("**********album", album)
#     # #print('!!!!!!!!!!!all_photos', all_photos)
#     # print("*****",detailed_album)
#     return detailed_album 
#     #return (photo_array, album.to_dict())

# Get details of all the photos present in an album by album id
@album_routes.route('/<int:id>')
@login_required
def get_album_by_id(id):
    # first thing photoId, 2nd is albumId
    album = Album.query.get(id).to_dict()
    album_photos = [photo.to_dict() for photo in Album.query.get(id).photos]
    album["photos"] = album_photos
    return album

#----------------------------------------------------------------------------------------------
# Delete photo from an album

@album_routes.route('/delete/<int:albumId>/<int:photoId>', methods=['GET','DELETE'])
@login_required
def delete_photo_album(albumId, photoId):
    print('^^^^^^^^^^^', albumId, photoId)

    related_album = Album.query.get(albumId)
    related_photo = Photo.query.get(photoId)
    print('^^^^^^^^^^^', related_album, related_photo)

    # If logged in user is not the owner of the album selected
    # if related_album.userId != current_user.id:
    #     return jsonify({'error': 'Unauthorized'}, 403 )
    related_photo.albums.remove(related_album)

    db.session.commit()
    
    res = related_photo.to_dict()
    print(res, "<--------res")
    return related_album.to_dict()


# Add photo to an album

@album_routes.route('/add/<int:albumId>/<int:photoId>', methods=['GET','POST'])
@login_required
def add_photo_to_album(albumId, photoId):
    print('^^^^^^^^^^^', albumId, photoId)

    related_album = Album.query.get(albumId)
    related_photo = Photo.query.get(photoId)
    print('^^^^^^^^^^^', related_album, related_photo)

    # If logged in user is not the owner of the album selected
    # if related_album.userId != current_user.id:
    #     return jsonify({'error': 'Unauthorized'}, 403 )
    related_photo.albums.extend([related_album])

    db.session.commit()
    return jsonify({'message': 'Photo successfully addded to the album'}, 200)

#----------------------------------------------------------------------------------------------
# Create a new album with AWS
@album_routes.route("/new/<int:user_id>", methods=["POST"])
@login_required
def create_album(user_id):
   
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        
        try: 
            if "image_url" in request.files:  
                image = request.files["image_url"]
                if not allowed_file(image.filename):
                    raise TypeError("ImageType file not permitted")
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                
                if "url" not in upload:
                    raise TypeError("There was an error with AWS")
                image_url = upload["url"]  
                
                new_album = Album(
                    title = form.data["title"],
                    description = form.data["description"],                   
                    image_url = image_url,
                    userId = user_id,
                    photos =  []
                )
                
                if not new_album:
                        raise Exception("New album could not be created")

                db.session.add(new_album)
                db.session.commit()
                return new_album.to_dict()
        except TypeError as e:
                msg = str(e)
                return {"message": msg}, 500
    else:
        return {"message: There was an error on submit. Hence, photo could not be created"}, 500
   
    
# Create a new album
# @album_routes.route("/new", methods=["GET","POST"])
# @login_required
# def create_album():
   
#     form = AlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
    
#     if form.validate_on_submit():
#         new_album = Album(
#             title = form.data["title"],
#             description = form.data["description"],
#             userId = current_user.id,
#             image_url = form.data["image_url"],
#             photos =  []
#         )

#         print(new_album)
#         db.session.add(new_album)
#         db.session.commit()
#         return new_album.to_dict()
    
#     if form.errors:
#         return form.errors, 401
    
#--------------------------------------------------------------------------------
# Delete an album by id:
@album_routes.route('/delete/<int:id>', methods=['GET','DELETE'])
@login_required
def delete_album(id):
   
    album_to_be_deleted = Album.query.get(id)
    print(album_to_be_deleted)

    # If album selected does not exist
    if not album_to_be_deleted:
        return jsonify({'error': 'Could not find the selected album'}, 404 )

    # If logged in user is not the owner of the album selected
    if album_to_be_deleted.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}, 403 )
    
    db.session.delete(album_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'Album deleted successfully'}, 200)
    
#----------------------------------------------------------------------------------
# Update an album by id AWS:
@album_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def update_album(id):

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
   
    if form.validate_on_submit():
        try:
            album_to_be_updated = Album.query.get(id)
        
            if not album_to_be_updated:
                raise Exception("Album can not be found")

            # if album_to_be_updated.userId != current_user.id:
            #     return jsonify({'error': 'Unauthorized'}, 403 )
            
            if "image_url" in request.files:  
                image = request.files["image_url"]
                if not allowed_file(image.filename):
                    raise TypeError("ImageType file not permitted")
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                
                if "url" not in upload:
                    raise TypeError("There was an error with AWS")
                album_to_be_updated.image_url = upload["url"] 
            
            album_to_be_updated.title = form.data["title"]
            album_to_be_updated.description = form.data["description"]
            # album_to_be_updated.image_url = form.data["image_url"] 
            album_to_be_updated.userId = current_user.id, 
            album_to_be_updated.photos = []

            db.session.commit()
            #return redirect("/api/albums/all") 
            return album_to_be_updated.to_dict()
    
        except Exception as e:
            msg = str(e)
            return {"message": msg}
        #return render_template("update_album.html", form=form, errors=form.errors)

# Update an album by id:
# @album_routes.route('/update/<int:id>', methods=['GET','PUT'])
# @login_required
# def update_album(id):

#     album_to_be_updated = Album.query.get(id)
    
#     # If album selected does not exist
#     if not album_to_be_updated:
#         return jsonify({'error': 'Could not find the selected album'}, 404 )

#     # # If logged in user is not the owner of the album selected
#     print('^^^^^^^', album_to_be_updated.userId)
#     print('*************', current_user.id)
#     if album_to_be_updated.userId != current_user.id:
#          return jsonify({'error': 'Unauthorized'}, 403 )
    
#     form = AlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
   
#     if form.validate_on_submit():
#         album_to_be_updated.title = form.data["title"]
#         album_to_be_updated.description = form.data["description"]
#         album_to_be_updated.image_url = form.data["image_url"] 
     
#         db.session.commit()
#         #return redirect("/api/albums/all") 
#         return album_to_be_updated.to_dict()
    
#     if form.errors:
#         return form.errors, 401
#         #return render_template("update_album.html", form=form, errors=form.errors)
#-------------------------------------------------------------------------------------
