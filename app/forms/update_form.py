from flask_wtf import FlaskForm
from wtforms import StringField, URLField, SubmitField
from wtforms.validators import DataRequired

class UpdatePhotoForm(FlaskForm):
    label = StringField("Label")
    title = StringField("Title")
    description = StringField("Description")
    url = URLField("PHOTO URL")
    submit = SubmitField("Submit")
