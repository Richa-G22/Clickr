from app.models import db, Photo, Album, User, environment, SCHEMA
#from app.models import db, photoalbums, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_photoalbums():
    #Photoalbum1 = photoalbums(photoId=1, albumId=1)
    photo5 = Photo(
        label='Abc', title='XYZ', description='Its a nice phot', url='https://upload.wikimedia.org/wikipedia/commons/e/ea/Spring_Lake%2C_New_Jersey_Beach_at_Sunrise.jpg', userId=1)
   
    db.session.add(photo5)

    album5 = Album(
        title='album1', description='This is album1. Looks good', userId=1)
    
    db.session.add(album5)
    #db.session.add(Photoalbum1)
    
    photo5.albums.extend([album5])
    #album5.photos.extend([photo5])
    #Photoalbum1 = photoalbums(photoId=1, albumId=1) 
    db.session.commit()
    


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