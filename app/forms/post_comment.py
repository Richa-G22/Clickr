from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class PostCommentForm(FlaskForm):
    # print("_________-")
    comment = TextAreaField('Comment', validators=[DataRequired()])
    # photoId = IntegerField('PhotoId')
    # userId = IntegerField("UserId")
    # submit = SubmitField('Post Comment')
