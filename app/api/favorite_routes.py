from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Favorite, Photo
from flask_login import login_required


favorite_routes = Blueprint('favorites', __name__)


# Get all favorite photos for the logged in User
@favorite_routes.route('/all')
@login_required
def all_favorites():
    all_favorites = Favorite.query.filter_by(userId=current_user.id).all()
    favorite_list = [
        {"id": favorite.id, "photoId": favorite.photoId, "userId": favorite.userId}
        for favorite in all_favorites
    ]

    # Ensure the response always contains the 'favorites' field
    response = {"userId": current_user.id, "favorites": favorite_list}

    return jsonify(response)


# Favorite a photo
@favorite_routes.route('/fav/<int:id>', methods=["POST"])
@login_required
def favorite_a_photo(id):

        new_fav = Favorite(
            photoId = id,
            userId = current_user.id
        )
        print(new_fav)
        db.session.add(new_fav)
        db.session.commit()
        return jsonify({'message': 'photo has been favorited successfully'})


# Unfavorite a photo
@favorite_routes.route('/unfav/<int:id>', methods=["DELETE"])
@login_required
def unfavorite_a_photo(id):

    photo_to_be_unfavorited = Photo.query.get(id)


    if photo_to_be_unfavorited is None:
        return jsonify({'error': 'Photo not found'}, 404)

    favorite_entry = Favorite.query.filter_by(photoId=id, userId=current_user.id).first()

    if favorite_entry:
        db.session.delete(favorite_entry)
        db.session.commit()
        return jsonify({'message': 'Photo has been unfavorited successfully'})
    else:
        return jsonify({'error': 'Photo is not favorited by the current user'}, 403)
