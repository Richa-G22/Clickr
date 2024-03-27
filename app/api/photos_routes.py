from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Photo, Album
from flask_login import login_required
from app.forms.photo_form import PhotoForm
import app.models
from app.awsS3 import allowed_file, upload_file_to_s3, get_unique_filename, remove_file_from_s3


photos_routes = Blueprint('photos', __name__)

# Get all photos
@photos_routes.route('/')
def all_photos():
    all_photos = Photo.query.all()
    photo_list = [{
                   'id': photo.id, 
                   'title': photo.title,
                   'description': photo.description, 
                   'userId': photo.userId,
                   'url': photo.url,
                   'label': photo.label
                } for photo in all_photos]

    return jsonify(photo_list)


# Get details of a photo by id
@photos_routes.route('/<int:id>')
def get_photo_by_id(id):
    try:
        photo =  Photo.query.get(id)

        if not photo:
            raise Exception("Photo does not exist")
        
        return photo.to_dict()
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404


# Create a new photo
@photos_routes.route("/new/<int:user_id>", methods=["POST"])
@login_required
def create_new_photo(user_id):
   
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("form in route before validation", form.title, form.description, form.url)
    if form.validate_on_submit():

        try:
            if "url" in request.files:
                image = request.files["url"]
                if not allowed_file(image.filename):
                    raise TypeError("ImageType file not permitted")
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    raise TypeError("There was an error with AWS")
                url = upload["url"]  
            
            new_photo = Photo(
                label = form.data["label"],
                title = form.data["title"],
                description = form.data["description"],
                url = url,
                userId = user_id
            )
            if not new_photo:
                raise Exception("New photo could not be created")

            print(new_photo)
            db.session.add(new_photo)
            db.session.commit()
            return new_photo.to_dict()
        except TypeError as e:
            msg = str(e)
            return {"message": msg}, 500
    else:
        return {"message: There was an error on submit. Hence, photo could not be created"}, 500
    

# Get all photos for the logged in User
@photos_routes.route('/current')
@login_required
def current_user_gallery():
    all_photos = Photo.query.filter_by(userId=current_user.id).all()
    photo_list = [{
                   'id': photo.id, 
                   'title': photo.title,
                   'description': photo.description, 
                   'userId': photo.userId,
                   'url': photo.url,
                   'label': photo.label
                } for photo in all_photos]

    return jsonify(photo_list)


# Delete a photo by id:
@photos_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    try: 
        photo_to_be_deleted = Photo.query.get(id)
        albums = photo_to_be_deleted.get_albums()
        print("*******",albums)
        # related_albums = Album.query.filter_by(photos["photoId"]=id).all()
        # related_albums = Album.query.get(photos["id"]=id).all()
        # print("88888",related_albums)
        # "photos": [photo.to_dict() for photo in album.photos],
      
        print(photo_to_be_deleted)

        for album in albums:
            for photo in album.photos:
                if (photo.id) == id:
                    photo.albums.remove(album)



        if not photo_to_be_deleted:
            return jsonify({'error': 'Could not find the selected photo'}, 404 )
        
        # if photo_to_be_deleted.userId != current_user.id:
        #     return jsonify({'error': 'Unauthorized'}, 403 )
        # photo_to_be_deleted.albums.remove[()]
        db.session.delete(photo_to_be_deleted)
        db.session.commit()
        return jsonify({'message': 'Photo deleted successfully'}, 200)
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404
    

# Update a photo
@photos_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_photo(id):

    form = PhotoForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        try:
            photo_to_be_updated = Photo.query.get(id)
            if not photo_to_be_updated:
                 raise Exception("Photo can not be found")
            
            if "url" in request.files:
                image = request.files["url"]
                if not allowed_file(image.filename):
                    raise TypeError("ImageType file not permitted")
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    raise TypeError("There was an error with AWS")
                photo_to_be_updated.url = upload["url"] 

            photo_to_be_updated.title = form.data["title"]
            photo_to_be_updated.label = form.data["label"]
            photo_to_be_updated.description = form.data["description"]
            # photo_to_be_updated.url = form.data["url"]
            photo_to_be_updated.userId = current_user.id  



            # photo_to_be_updated = Photo.query.get(id)
            # if not Photo:
            #     raise Exception("Photo can not be found")

            # photo_to_be_updated.title = form.data["title"]
            # photo_to_be_updated.label = form.data["label"]
            # photo_to_be_updated.description = form.data["description"]
            # photo_to_be_updated.url = form.data["url"]
            # photo_to_be_updated.userId = current_user.id 
            db.session.commit()
            return photo_to_be_updated.to_dict()
        except Exception as e:
            msg = str(e)
            return {"message": msg}








    