from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Favorite
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