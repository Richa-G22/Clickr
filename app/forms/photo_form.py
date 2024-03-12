from flask_wtf import FlaskForm
from wtforms import StringField, URLField, SubmitField
from wtforms.validators import DataRequired

class PhotoForm(FlaskForm):
    label = StringField("label")
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description")
    url = StringField("url", validators=[DataRequired()])
    submit = SubmitField("Submit")

    
