from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        title='Nature', description='This album is a collection of landscape photos', image_url='https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg', userId=1)
    album2 = Album(
        title='Wonderful Places', description='Collection of must visit places', image_url='https://wallpapers.com/images/featured/720p-nature-background-te0eo4yinuw49nh1.jpg', userId=2)
    album3 = Album(
        title='Animals', description='Animal Collection', image_url='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',userId=3)
    

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