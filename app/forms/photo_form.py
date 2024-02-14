from flask_wtf import FlaskForm
from wtforms import StringField, URLField, SubmitField
from wtforms.validators import DataRequired

class CreatePhotoForm(FlaskForm):
    label = StringField("Label")
    title = StringField("Title")
    description = StringField("Description")
    url = URLField("PHOTO URL", validators=[DataRequired()])
    submit = SubmitField("Submit")
