from flask import Blueprint,session, request,redirect, jsonify, render_template
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

        return redirect("/api/photo/all")

    if form.errors:
        print(form.errors, 401)
        return render_template("create_photo.html", form=form, errors=form.errors)

    return render_template("create_photo.html", form=form, errors=None)


@photo_routes.route('/update/<int:photoId>', methods=['GET','PUT'])
@login_required
def update_post(photoId):
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == "GET":
        photo = Photo.query.get(photoId)

        if not photo :
            return jsonify({'error': 'could not find photo'}), 404

        if photo.userId != current_user.id:
            return jsonify({'error': 'unauthorized'}), 403
        return render_template("update_photo.html",form=form, photo=photo)
    else:
        if form.validate_on_submit():
            data = form.data
            photo.label=data["label"]
            photo.title=data["title"]
            photo.description=data["description"]
            photo.url=data["url"]
            db.session.commit()
            return photo.to_dict()
        return form.errors, 401



# Delete an photo by id:
@photo_routes.route('/delete/<int:photoId>', methods=['GET','DELETE'])
@login_required
def delete_photo(photoId):

    photo_to_be_deleted = Photo.query.get(photoId)
    print(photo_to_be_deleted)

    # If photo selected does not exist
    if not photo_to_be_deleted:
        return jsonify({'error': 'Could not find the selected photo'}, 404 )

    # If logged in user is not the owner of the photo selected
    if photo_to_be_deleted.id != current_user.id:
        return jsonify({'error': 'Unauthorized'}, 403 )

    db.session.delete(photo_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'photo deleted successfully'}, 200)
