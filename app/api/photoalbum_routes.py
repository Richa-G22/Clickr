from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Album, Photo, photoalbums
from flask_login import login_required
from ..forms.album_form import AlbumForm
import app.models
from sqlalchemy import and_

photoalbum_routes = Blueprint('photoalbums', __name__)

# Delete photo from an album
@photoalbum_routes.route('/delete/<int:albumId>/<int:photoId>', methods=['GET','DELETE'])
@login_required
def delete_photo_from_album(albumId, photoId):
    print('^^^^^^^^^^^', albumId, photoId)
    #photo_to_be_deleted = list(db.session.query(photoalbums).filter_by(albumId, photoId).all()) 
    #photo_to_be_deleted = list(db.session.query(photoalbums).filter_by(albumId=albumId).all()) 
    # photo_to_be_deleted = list(db.session.query(photoalbums).filter_by(
    #     albumId = albumId,
    #     photoId = photoId)) 
    # 
    related_album = Album.query.get(albumId)
    related_photo = Photo.query.get(photoId)
    related_photo.albums.remove([related_album])
    # print('$$$$$$$$$$$',photo_to_be_deleted)

    # If album selected does not exist
    # if not photo_to_be_deleted:
    #     return jsonify({'error': 'Could not find the selected album'}, 404 )

    # If logged in user is not the owner of the album selected
    # if album_to_be_deleted.userId != current_user.id:
    #     return jsonify({'error': 'Unauthorized'}, 403 )
    
    # db.session.delete(photo_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'Photo deleted successfully from the album'}, 200)