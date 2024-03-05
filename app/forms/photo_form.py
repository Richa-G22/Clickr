from flask_wtf import FlaskForm
from wtforms import StringField, URLField, SubmitField
from wtforms.validators import DataRequired

class PhotoForm(FlaskForm):
    label = StringField("Label")
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    url = URLField("PHOTO URL", validators=[DataRequired()])
    submit = SubmitField("Submit")
