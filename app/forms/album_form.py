from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, URLField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    userId = IntegerField("User Id")
    image_url = URLField("Album Image") 
    submit = SubmitField("Submit")