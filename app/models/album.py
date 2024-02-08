from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .photoalbum import photoalbums


class Album(db.Model, UserMixin):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(50))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="albums")
    photos = db.relationship("Photo", secondary=photoalbums, back_populates="albums")
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'userId': self.userId,
        }
