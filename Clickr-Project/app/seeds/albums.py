from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        title='album1', description='This is album1. Looks good', userId=1)
    album2 = Album(
        title='album2', description='This is album2. Looks nice', userId=2)
    album3 = Album(
        title='album3', description='This is album3. Looks wonderful', userId=3)
    

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()