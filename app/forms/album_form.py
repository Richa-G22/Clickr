from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, URLField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    # title = StringField("Title", validators=[DataRequired()])
    # description = StringField("Description")
    # userId = IntegerField("User Id")
    # image_url = URLField("Album Image") 
    # submit = SubmitField("Submit")

    title = StringField("title", validators=[DataRequired()])
    description = StringField("description")
    # userId = IntegerField("userId")
    image_url = StringField("image_url", validators=[DataRequired()])
    submit = SubmitField("Submit")