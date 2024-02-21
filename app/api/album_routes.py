from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Album, Photo, photoalbums
from flask_login import login_required
# from ..forms.album_form import AlbumForm
from app.forms.album_form import AlbumForm
import app.models


album_routes = Blueprint('albums', __name__)

# Get all albums for the logged in User
@album_routes.route('/all')
@login_required
def all_albums():
    all_albums = Album.query.filter_by(userId=current_user.id).all()
    album_list = [{
                   'id': album.id, 
                   'title': album.title,
                   'description': album.description, 
                   'userId': album.userId,
                   'image_url': album.image_url
                } for album in all_albums]

    return jsonify(album_list)


# Get details of all the photos present in an album by album id
@album_routes.route('/<int:id>')
@login_required
def get_album_by_id(id):
 
    album =  Album.query.get(id)

    all_photos = list(db.session.query(photoalbums).filter_by(albumId=album.id).all())
    photo_array = [] 
    for photo in all_photos:
        (photoId,albumId) = photo 
        photo_details = Photo.query.get(photoId)
        print('######################',photo_details.to_dict())
        photo_array.append(photo_details.to_dict())
    print('^^^^^^^^^^^^^^',photo_array)

    # all_photos = photoalbums.query.filter_by(albumId = album.id).all
    # photo_details = Photo.query.get(photo.id) 

    detailed_album = {
        'album' : { 
            'id': album.id, 
            'title': album.title,
            'description': album.description, 
            'userId': album.userId,
            'image_url': album.image_url 
        },
        'photos' : photo_array
    }
    #print("**********album", album)
    #print('!!!!!!!!!!!all_photos', all_photos)
    print("*****",detailed_album)
    return detailed_album
    #return (photo_array, album.to_dict())

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
    if related_album.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}, 403 )
    related_photo.albums.remove(related_album)

    db.session.commit()
    return jsonify({'message': 'Photo deleted successfully from the album'}, 200)


# Add photo to an album

@album_routes.route('/add/<int:albumId>/<int:photoId>', methods=['GET','POST'])
@login_required
def add_photo_to_album(albumId, photoId):
    print('^^^^^^^^^^^', albumId, photoId)

    related_album = Album.query.get(albumId)
    related_photo = Photo.query.get(photoId)
    print('^^^^^^^^^^^', related_album, related_photo)

    # If logged in user is not the owner of the album selected
    if related_album.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}, 403 )
    related_photo.albums.extend([related_album])

    db.session.commit()
    return jsonify({'message': 'Photo successfully addded to the album'}, 200)

#----------------------------------------------------------------------------------------------

# Create a new album
@album_routes.route("/new", methods=["GET","POST"])
@login_required
def create_album():
   
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_album = Album(
            title = form.data["title"],
            description = form.data["description"],
            userId = current_user.id,
            image_url = form.data["image_url"]
        )

        print(new_album)
        db.session.add(new_album)
        db.session.commit()
        #return redirect("/api/albums/all") 
        return new_album.to_dict()
    
    if form.errors:
        return form.errors, 401
        #return render_template("create_album.html", form=form, errors=form.errors)

    #return render_template("create_album.html", form=form, errors=None)
    


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
    

# Update an album by id:
@album_routes.route('/update/<int:id>', methods=['GET','PUT'])
@login_required
def update_album(id):

    album_to_be_updated = Album.query.get(id)
    
    # If album selected does not exist
    if not album_to_be_updated:
        return jsonify({'error': 'Could not find the selected album'}, 404 )

    # # If logged in user is not the owner of the album selected
    print('^^^^^^^', album_to_be_updated.userId)
    print('*************', current_user.id)
    if album_to_be_updated.userId != current_user.id:
         return jsonify({'error': 'Unauthorized'}, 403 )
    
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
   
    if form.validate_on_submit():
        album_to_be_updated.title = form.data["title"]
        album_to_be_updated.description = form.data["description"]
        album_to_be_updated.image_url = form.data["image_url"] 
     
        db.session.commit()
        #return redirect("/api/albums/all") 
        return album_to_be_updated.to_dict()
    
    if form.errors:
        return form.errors, 401
        #return render_template("update_album.html", form=form, errors=form.errors)

