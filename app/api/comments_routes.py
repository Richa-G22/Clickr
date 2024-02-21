from flask import Flask, jsonify, request, render_template, Blueprint, session, redirect;
from flask_login import current_user
from app.models import Comment, db, Photo, User
from flask_login import login_required
from app.forms import UpdateCommentForm, PostCommentForm

comments_routes = Blueprint("comments_routes", __name__)

@comments_routes.route("/<int:photoId>", methods=["GET"])
def get_all_comments(photoId):
    comments = Comment.query.filter_by(photoId=photoId).all()

    comments_data = [
        {
            "id": comment.id,
            "comment": comment.comment,
            "userId": comment.userId,
        }
        for comment in comments

    ]


    for comment in comments_data:
        user = User.query.get(comment['userId'])
        # print("$$$$$$user", user )
        comment['userName'] = user.username
    return jsonify(comments_data)


@comments_routes.route("/<int:photoId>/postComments", methods=["POST"])
@login_required
def post_comment(photoId):

    body = request.get_json(force=True)
    # print("^^^^^body", body)
    comment = body["comment"]
    photo = body["photo"]
    # print("%%%%photo", photo)


    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_photos = Photo.query.filter_by(id=photoId).first()
        photo_owner_id =user_photos.to_dict()["userId"]
        user = User.query.filter_by(id=photo_owner_id).first()


        if(current_user.id == user.to_dict()["id"]):
        # if(current_user.id == user_photos.userId):
            return jsonify("Owner can not comment on his own photo")


        # Create a new comment with the provided data
        new_comment = Comment(
            comment=form.data["comment"],
            photoId=photoId,  # Assign the photo ID from the URL parameter
            userId=current_user.id,

                # Assign the current user's ID
        )
        # print("!!!!!!!new_comment", new_comment.to_dict())

        # Add the new comment to the database and commit the transaction
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    if form.errors:
        return form.errors, 401


    #     # Return a success message
    #     return jsonify({"message": "Comment added successfully"}), 201

    # # If the request method is GET, render the template with the form
    # if request.method == "GET":
    #     return render_template("post.html", form=form, photoId=photoId)

    # # If the form validation fails, return an error message
    # return jsonify({"error": "Form validation failed"}), 400


# @comments_routes.route("/update/<int:id>", methods=["GET", "POST"])
# @login_required
# def update_comment(id):
#     comment_to_be_updated = Comment.query.get_or_404(id)

#     if not comment_to_be_updated:
#         return jsonify({"error": "Could not find the selected comment"}, 404)

    # if comment_to_be_updated.userId != current_user.id:
    #     return jsonify({"error": "Unauthorized"}, 403)

#     form = UpdateCommentForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if request.method == "POST":
#         if (
#             "_method" in request.form and request.form["_method"] == "PUT"
#         ):  # Check for _method field
#             if form.validate():
#                 comment_text = form.comment.data
#                 comment_to_be_updated.comment = comment_text
#                 db.session.commit()
#                 return jsonify({"message": "Comment updated successfully"})
#             else:
#                 return jsonify({"error": form.errors}), 400

#     # For GET requests or invalid form submissions, render the update form
#     return render_template("update.html", form=form, errors=form.errors, id=id)

@comments_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    comment_to_be_updated = Comment.query.get(id)

    if not comment_to_be_updated:
        # return jsonify({"error": "Could not find the selected comment"}, 404)
        return {'error': 'Cound not find the selected comment'}, 404

    if comment_to_be_updated.userId != current_user.id:
        # return jsonify({"error": "Unauthorized"}, 403)
        return {'error': 'Unauthorized'}, 403

    form = UpdateCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        comment_to_be_updated.comment=form.data['comment']
        db.session.commit()
        return comment_to_be_updated.to_dict()
    return form.errors, 401




@comments_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment_to_be_deleted = Comment.query.get(id)

    if not comment_to_be_deleted:
        return jsonify({'error': 'Could not find the selected comment'} ), 404

    # If logged in user is not the owner of the photo selected
    if comment_to_be_deleted.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'} ), 403

    db.session.delete(comment_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'comment deleted successfully'})
