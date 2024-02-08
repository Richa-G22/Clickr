from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .photoalbum import photoalbums


class Photo(db.Model, UserMixin):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(150))
    title = db.Column(db.String(150))
    description = db.Column(db.String(500))
    url = db.Column(db.String(1000))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="photos")
    comments = db.relationship("Comment", cascade="all, delete", back_populates="photo")
    favorites = db.relationship("Favorite", cascade="all, delete", back_populates="photo")
    albums = db.relationship("Album", cascade="all, delete", secondary=photoalbums, back_populates="photos")
 
    def to_dict(self):
        return {
            'id': self.id,
            'label': self.label,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'userId': self.userId,
        }