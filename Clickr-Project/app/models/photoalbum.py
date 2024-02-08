from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


photoalbums = db.Table(
    "photoalbums",
    db.Column("photoId", db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), primary_key = True),
    db.Column("albumId", db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), primary_key = True)
    )
    
if environment == "production":
    photoalbums.schema = SCHEMA