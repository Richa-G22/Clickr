from app.models import db, Photo, Album, User, environment, SCHEMA
#from app.models import db, photoalbums, environment, SCHEMA
from sqlalchemy.sql import text
from .photos import Photo

# Adds a demo user, you can add other users here if you want
def seed_photoalbums():
    photo1 = Photo(
        label='Abc', title='XYZ', description='Its a nice phot', url='https://upload.wikimedia.org/wikipedia/commons/e/ea/Spring_Lake%2C_New_Jersey_Beach_at_Sunrise.jpg', userId=1)
    photo2 = Photo(
        label='PQR', title='LMN', description='Its an awesome shot', url='https://en-academic.com/pictures/enwiki/72/Hopetoun_falls.jpg', userId=2)
    photo3 = Photo(
        label='DEF', title='IJK', description='Its a great photo', url='https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg', userId=3)
    

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)


    album1 = Album(
        title='album1', description='This is album1. Looks good', image_url='https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg', userId=1)
    album2 = Album(
        title='album2', description='This is album2. Looks nice', image_url='https://wallpapers.com/images/featured/720p-nature-background-te0eo4yinuw49nh1.jpg', userId=2)
    album3 = Album(
        title='album3', description='This is album3. Looks wonderful', image_url='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',userId=3)
    

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    # photo5 = Photo(
    #     label='Abc', title='XYZ', description='Its a nice phot', url='https://upload.wikimedia.org/wikipedia/commons/e/ea/Spring_Lake%2C_New_Jersey_Beach_at_Sunrise.jpg', userId=1)
   
    # db.session.add(photo5)

    # album5 = Album(
    #     title='album1', description='This is album1. Looks good', userId=1)
    
    # db.session.add(album5)
    # photo5.albums.extend([album5])
  
    # db.session.commit()
    # photo5 = Photo.query.filter_by(id = 1).first()
    # album5 = Album.query.filter_by(id = 1).first()
    # album5 = Album.query.filter_by(id = 2).first()
    photo1.albums.extend([album1, album2])
    photo2.albums.extend([album1])
    photo3.albums.extend([album1])

    # photo5.albums.append(album5)
    db.session.commit()

    # photoalbum = (Photo.id, Album.id) 
    # photoalbum.albums.extend([])


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photoalbums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photoalbums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photoalbums"))
        
    db.session.commit()