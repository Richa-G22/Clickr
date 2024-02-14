from flask import Flask, jsonify, request, render_template, Blueprint, session, redirect
from flask_login import current_user
from app.models import Comment, db
from flask_login import login_required
from app.forms import UpdateCommentForm, PostCommentForm

comments_routes = Blueprint("comments_routes", __name__)

@comments_routes.route("/<int:photoId>/comments", methods=["GET"])
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

    return jsonify(comments_data)


@comments_routes.route("/<int:id>/postComments", methods=["GET", "POST"])
@login_required
def post_comment(id):
    form = PostCommentForm()

    if form.validate_on_submit():
        comment_text = form.comment.data

        # Create a new comment with the provided data
        new_comment = Comment(
            comment=comment_text,
            photoId=id,  # Assign the photo ID from the URL parameter
            userId=current_user.id,  # Assign the current user's ID
        )

        # Add the new comment to the database and commit the transaction
        db.session.add(new_comment)
        db.session.commit()

        # Return a success message
        return jsonify({"message": "Comment added successfully"}), 201

    # If the request method is GET, render the template with the form
    if request.method == "GET":
        return render_template("post.html", form=form, photoId=id)

    # If the form validation fails, return an error message
    return jsonify({"error": "Form validation failed"}), 400


@comments_routes.route("/update/<int:id>", methods=["GET", "POST"])
@login_required
def update_comment(id):
    comment_to_be_updated = Comment.query.get_or_404(id)

    if not comment_to_be_updated:
        return jsonify({"error": "Could not find the selected comment"}, 404)

    if comment_to_be_updated.userId != current_user.id:
        return jsonify({"error": "Unauthorized"}, 403)

    form = UpdateCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if request.method == "POST":
        if (
            "_method" in request.form and request.form["_method"] == "PUT"
        ):  # Check for _method field
            if form.validate():
                comment_text = form.comment.data
                comment_to_be_updated.comment = comment_text
                db.session.commit()
                return jsonify({"message": "Comment updated successfully"})
            else:
                return jsonify({"error": form.errors}), 400

    # For GET requests or invalid form submissions, render the update form
    return render_template("update.html", form=form, errors=form.errors, id=id)


@comments_routes.route("/delete/<int:id>", methods=["GET", "DELETE"])
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
