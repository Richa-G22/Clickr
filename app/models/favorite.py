from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Favorite(db.Model, UserMixin):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    photoId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="favorites")
    photo = db.relationship("Photo", back_populates="favorites")
    
    def to_dict(self):
        return {
            'id': self.id,
            'photoId': self.photoId,
            'userId': self.userId,
        }