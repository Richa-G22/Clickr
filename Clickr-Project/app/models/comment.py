from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(250))
    photoId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="comments")
    photo = db.relationship("Photo", back_populates="comments")
    
    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'photoId': self.photoId,
            'userId': self.userId,
        }
