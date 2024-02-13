from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Album
from flask_login import login_required
from ..forms.album_form import AlbumForm


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
                   'userId': album.userId
                } for album in all_albums]

    return jsonify(album_list)


# Get an album for the logged in User by album id
@album_routes.route('/<int:id>')
@login_required
def get_album_by_id(id):
    all_albums = Album.query.filter_by(userId=current_user.id).all()
    
    one_album = [{
                   'id': album.id, 
                   'title': album.title,
                   'description': album.description, 
                   'userId': album.userId
                } for album in all_albums if album.id == id ]
    
    return jsonify(one_album)


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
            userId = current_user.id
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
    if album_to_be_updated.userId != current_user.id:
         return jsonify({'error': 'Unauthorized'}, 403 )
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
   
    if form.validate_on_submit():
    
        album_to_be_updated.title = form.data["title"]
        album_to_be_updated.description = form.data["description"]
     
        db.session.commit()
        #return redirect("/api/albums/all") 
        return album_to_be_updated.to_dict()
    
    if form.errors:
        return form.errors, 401
        #return render_template("update_album.html", form=form, errors=form.errors)

