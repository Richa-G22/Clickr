from flask import Blueprint,session, request, jsonify, render_template
from flask_login import current_user
from app.models import db, Photo
from flask_login import login_required
from app.forms import CreatePhotoForm



photo_routes = Blueprint('photos', __name__)

# get all photos
@photo_routes.route('/all')
def all_photos():
    all_photos = Photo.query.all()
    photo_list = [{'id':photo.id,'label':photo.label, 'title': photo.title, 'description': photo.description, 'url': photo.url,'userId': photo.userId} for photo in all_photos]

    return jsonify(photo_list)


# Get all photos by userId
@photo_routes.route('/current')
@login_required
def user_photos():
    user_photos = Photo.query.filter_by(userId=current_user.id).all()

    photo_list = [{
        'id': photo.id,
        'label': photo.label,
        'title': photo.title,
        'description': photo.description,
        'url': photo.url,
        'userId': photo.userId
        } for photo in user_photos]

    return jsonify(photo_list)


# Get an photo for the logged in User by photo id
@photo_routes.route('/<int:photoId>')
@login_required
def get_photo_by_id(photoId):
    all_photos = Photo.query.filter_by(userId=current_user.id).all()

    one_photo = [{
        'id': photo.id,
        'label': photo.label,
        'title': photo.title,
        'description': photo.description,
        'url': photo.url,
        'userId': photo.userId
        } for photo in all_photos if photo.id == photoId ]

    return jsonify(one_photo)

 # Create a new photo
@photo_routes.route("/new", methods=["GET","POST"])
@login_required
def create_photo():

    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data= form.data
        new_photo = Photo(
            label=data["label"],
            title=data["title"],
            description=data["description"],
            url=data["url"],
            userId=current_user.id
        )

        print(new_photo)
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()


    if form.errors:
        return form.errors, 401
        #return render_template("create_photo.html", form=form, errors=form.errors)

    #return render_template("create_photo.html", form=form, errors=None)


# Update an photo by id:
@photo_routes.route('/update/<int:id>', methods=['GET','PUT'])
@login_required
def update_photo(id):

    photo_to_be_updated = Photo.query.get(id)

# If photo selected does not exist
    if not photo_to_be_updated:
        return jsonify({'error': 'Could not find the selected photo'}, 404 )

    # If logged in user is not the owner of the photo selected
    if photo_to_be_updated.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}, 403 )
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        photo_to_be_updated.label = data["label"]
        photo_to_be_updated.title = data["title"]
        photo_to_be_updated.url = data["url"]
        photo_to_be_updated.description = data["description"]
        db.session.commit()
        return photo_to_be_updated.to_dict()

    if form.errors:
        return form.errors, 401
    #return render_template("update_photo.html", form=form, errors=form.errors)


# Delete an photo by id:
@photo_routes.route('/delete/<int:id>', methods=['GET','DELETE'])
@login_required
def delete_photo(id):
    print("hello")

    photo_to_be_deleted = Photo.query.get(id)
    print(photo_to_be_deleted)

    # If photo selected does not exist
    if not photo_to_be_deleted:
        return jsonify({'error': 'Could not find the selected photo'} ), 404

    # If logged in user is not the owner of the photo selected
    if photo_to_be_deleted.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'} ), 403

    db.session.delete(photo_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'photo deleted successfully'})

# print("hellooo")
