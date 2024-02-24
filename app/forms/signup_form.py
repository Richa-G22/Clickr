from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    # firstName = StringField("firstname", validators=[DataRequired()])
    # lastName = StringField("lastname", validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(
                min=2, max=30, message="Username must be between 2 to 30 characters"
            )])
    firstname = StringField("firstname", validators=[DataRequired(), Length(
                min=2, max=30, message="Firstname must be between 2 to 30 characters"
            ),])
    lastname = StringField("lastname", validators=[DataRequired(), Length(
                min=2, max=30, message="Last Name must be between 2 to 30 characters"
            )])
    email = StringField('email', validators=[DataRequired(), user_exists,Email() ])
    password = StringField('password', validators=[DataRequired(), Length(min=4, message="Password must be at least 4 characters long")])
