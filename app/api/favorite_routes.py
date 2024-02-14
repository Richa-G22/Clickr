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
    favorite_list = [{
                   'id': favorite.id, 
                   'photoId': favorite.photoId,
                   'userId': favorite.userId
                } for favorite in all_favorites]

    return jsonify(favorite_list)


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

        # If logged in user is not the owner of the photo selected
        if photo_to_be_unfavorited.userId != current_user.id:
            return jsonify({'error': 'Unauthorized'}, 403 )

        print(photo_to_be_unfavorited)
        db.session.delete(photo_to_be_unfavorited)
        db.session.commit()
        return jsonify({'message': 'photo has been unfavorited successfully'})

    