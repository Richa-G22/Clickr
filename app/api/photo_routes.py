from flask import Blueprint,session, request,redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Photo
from flask_login import login_required
from app.forms import CreatePhotoForm
from app.forms.update_form import UpdatePhotoForm


photo_routes = Blueprint('photos', __name__)


# get all photos
@photo_routes.route('/')
def all_photos():
    all_photos = Photo.query.all()
    photo_list = [{'id':photo.id,'label':photo.label, 'title': photo.title, 'description': photo.description, 'url': photo.url,'userId': photo.userId} for photo in all_photos]

    return jsonify(photo_list)


# create new post
@photo_routes.route('/upload', methods=['GET','POST'])
@login_required
def create_post():


    if request.method == "GET":
        form = CreatePhotoForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        return render_template("create_photo.html", form=form)
    elif form.validate_on_submit():
            data = form.data
            create_post = Photo(
            label=data["label"],
            title=data["title"],
            description=data["description"],
            url=data["url"],
            userId=current_user.id
        )
            db.session.add(create_post)
            db.session.commit()
            return create_post.to_dict()
    else :
        return form.errors, 401


# # update new post
# @photo_routes.route('/<int:photoId>', methods=['GET','PUT'])
# @login_required
# def update_post(photoId):
#     if request.method == "GET":
#         form = CreatePhotoForm()
#         form['csrf_token'].data = request.cookies['csrf_token']
#         return render_template("update_photo.html", form=form)



#     # # user must be logged in
#     # if not current_user:
#     #     return jsonify({'error': 'must be logged in to update a photo'}), 401

#     else :
#         photo = Photo.query.get(photoId)
#         if not (photo or  not photo.userId != current_user.id):
#             return jsonify({'error': 'could not find photo'}), 404

#     # if not owner of photo
#     # if photo.userId != current_user.id:
#     #     return jsonify({'error': 'unauthorized'}), 403



#     if form.validate_on_submit():
#         print("reached here")
#         data = form.data
#         photo.label=data["label"]
#         photo.title=data["title"]
#         photo.description=data["description"]
#         photo.url=data["url"],





#         db.session.commit()
#         return photo.to_dict()
#     return form.errors, 401


@photo_routes.route('/<int:photoId>', methods=['GET','PUT'])
@login_required
def update_post(photoId):
    form = UpdatePhotoForm()
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


# delete photo by Id

@photo_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    # user must be logged in
    if not current_user:
        return jsonify({'error': 'must be logged in to delete a photo'}), 401

    photo = Photo.query.get(photoId).first()
    print("********", photo)
    # photo = Photo.query.get(id)

    # if photo not exists
    if not photo:
        return jsonify({'error': 'could not find photo'}), 404

    # if not owner of photo
    if photo.userId != current_user.id:
        return jsonify({'error': 'unauthorized'}), 403
    db.session.delete(photo)
    db.session.commit()
    return jsonify({'message': 'Photo deleted successfully'}), 200
