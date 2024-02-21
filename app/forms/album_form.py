from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    title = StringField("Title")
    description = StringField("Description")
    userId = IntegerField("User Id")
    image_url = StringField("Album Image") 
    submit = SubmitField("Submit")