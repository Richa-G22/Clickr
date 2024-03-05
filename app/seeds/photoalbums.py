from app.models import db, Photo, Album, User, environment, SCHEMA
#from app.models import db, photoalbums, environment, SCHEMA
from sqlalchemy.sql import text
from .photos import Photo

# Adds a demo user, you can add other users here if you want
def seed_photoalbums():
    photo1 = Photo(
        label='A Beautiful Sunrise', title='A Beautiful Sunrise', description='Perfect sunrise by the beach', url='https://upload.wikimedia.org/wikipedia/commons/e/ea/Spring_Lake%2C_New_Jersey_Beach_at_Sunrise.jpg', userId=1)
    photo2 = Photo(
        label='Waterfall', title='Waterfall', description='Nature at its best', url='https://cdn.pixabay.com/photo/2017/08/07/23/11/iceland-2608985_640.jpg', userId=2)
    photo3 = Photo(
        label='Nature', title='Nature', description='A beautiful coconut palm tree standing high in the pink evening sky', url='https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg', userId=3)
    photo4 = Photo(
        label='Birds', title='Hummingbird', description='Hummingbird enjoying the sweetness of flowers', url='https://www.pbs.org/wnet/nature/files/2019/07/Super-Hummingbirds-2-1280x675.jpg', userId=1)
    photo5 = Photo(
        label='Squirrel', title='Squirrel', description='A cute squirrel', url='https://shotkit.com/wp-content/uploads/bb-plugin/cache/nature-photography-landscape-a892fa3059994f7f5119d4a53fadada3-zybravgx2q47.jpg', userId=2)
    photo6 = Photo(
        label='Squirrel and the bokeh', title='Squirrel and the bokeh', description='Squirrel and the perfect bokeh', url='https://e1.pxfuel.com/desktop-wallpaper/704/777/desktop-wallpaper-squirrel-flowers-bokeh-1920x1200-spring-squirrels.jpg', userId=3)
    photo7 = Photo(
        label='Reflection', title='Reflection', description='A lone tree, the night sky and a perfect reflection ', url='https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?u%5Br%5D=2&u%5Bs%5D=0.5&u%5Ba%5D=0.8&u%5Bt%5D=0.03&quality=82&w=600c=1050%2C550&w=1050', userId=1)
    photo8 = Photo(
        label='A Magical Crystal Ball', title='A Magical Crystal Ball', description='A beautiful composite of nature and the glass globe', url='https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg', userId=2)
    photo9 = Photo(
        label='The Milky Way', title='The Milky Way', description='Enjoying a million stars with moon by my side', url='https://eadn-wc04-796033.nxedge.io/wp-content/uploads/home-banner-2-2-e1646713448525.jpg', userId=3)
    photo10 = Photo(
        label='The perfect balance', title='The perfect balance', description='Balance and Reflection ', url='https://climatecommunication.yale.edu/wp-content/uploads/2017/04/001-stone-circle-jpeg-768x350.jpg', userId=1)
    photo11 = Photo(
        label='Hope', title='Hope', description='A sapling growing from a cut tree trunk', url='https://www.hindustantimes.com/ht-img/img/2023/07/26/550x309/n1b_1690349255499_1690349264373.jpg', userId=2)
    photo12 = Photo(
        label='Butterfly', title='Butterfly', description='A beautiful butterfly and the vibrant flower', url='https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg', userId=3)
    photo13 = Photo(
        label='Tiger', title='Tiger', description='A young tiger looking for hunt', url='https://www.shutterstock.com/image-photo/great-tiger-male-nature-habitat-600nw-696476371.jpg', userId=1)
    photo14 = Photo(
        label='Long exposure', title='Long exposure', description='Long exposure photography - Milky White Waterfall', url='https://t4.ftcdn.net/jpg/01/31/89/13/360_F_131891333_YtJeWozj269tpiWnwz4vBkCBe7h26qNU.jpg', userId=2)
    photo15 = Photo(
        label='Waterfall and long exposure', title='Waterfall and long exposure', description='A beautiful shot with matte theme. Edited in Lightroom and Photoshop', url='https://images.pexels.com/photos/3086736/pexels-photo-3086736.jpeg?cs=srgb&dl=pexels-jeremy-mosley-3086736.jpg&fm=jpg', userId=3)
    photo16 = Photo(
        label='Utah', title='Utah', description='Utah National Park', url='https://res.cloudinary.com/simpleview/image/upload/v1523399469/clients/saltlake/63909faa_0ec4_435a_8bff_1d2341305bf5_ef5d37c6-3dca-4730-9f1b-012e831cb057.jpg', userId=1)
    photo17 = Photo(
        label='Lake McDonald', title='Lake McDonald', description='Lake McDonald, Glacier National Park, Montana, USA', url='https://i.pinimg.com/474x/8b/43/ab/8b43abce7e822186636ce7224f0c0510.jpg', userId=2)
    photo18 = Photo(
        label='Lake McDonald, Montana', title='Lake McDonald, Montana', description='A perfect evening at Lake McDonald', url='https://images.squarespace-cdn.com/content/v1/50f189dde4b07e77c464e9f3/1598108892460-WEVN55HUYD0LH1R2Z4TV/Lake+McDonald+Glory.jpg', userId=3)
    photo19 = Photo(
        label='Northern Lights', title='Northern Lights', description='Northern Lights, Finland', url='https://i.natgeofe.com/n/8352c802-76ec-4a3b-84e5-8a22e1227005/NJ0002.jpg', userId=3)
    photo20 = Photo(
        label='Portland, Maine', title='Portland, Maine', description='Portland Headlight, Maine, USA', url='https://bdc2020.o0bc.com/wp-content/uploads/2023/09/AP23259682685757-65084960e96f2.jpg', userId=1)
    photo21 = Photo(
        label='Acadia National Park', title='Acadia National Park', description='Acadia National Park, USA', url='https://static.wixstatic.com/media/fdb5f7_c3443409984e4ca2b15f47c7af1a37ae~mv2.jpg/v1/fill/w_1200,h_799,al_c,q_85/7336840756_38d05ffe9b_o_0.jpg', userId=2)
    photo22 = Photo(
        label='Mirror Lake', title='Mirror Lake', description='Mirror Lake, Rocky Mountain National Park, USA', url='https://hike734.com/wp-content/uploads/2020/05/Mirror-Lake.jpg', userId=3)
    photo23 = Photo(
        label='Lone Eagle Peak, Colorado', title='Lone Eagle Peak, Colorado', description='The Magestic Lone Eagle Peak', url='https://live.staticflickr.com/65535/9542059968_4e93f9603d_b.jpg', userId=1)
    photo24 = Photo(
        label='Bear Lake, Colorado', title='Bear Lake, Colorado', description='Bear Lake and the perfect reflection', url='https://www.destinationparks.com/images/park/rocky-mountain-national-park-1280x853.jpg', userId=2)
    photo25 = Photo(
        label='Maroon Bells, Colorado', title='Maroon Bells, Colorado', description='Rising run at Maroon Bells, Aspen , Colorado', url='https://www.aspensnowmass.com/-/media/aspen-snowmass/images/hero/hero-image/summer/2022/maroon-bells-faq-hero-20220324.jpg?mw=1506&mh=930&hash=4A9A40C62E9440EA221694E41591050A', userId=3)
    
    

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)
    db.session.add(photo11)
    db.session.add(photo12)
    db.session.add(photo13)
    db.session.add(photo14)
    db.session.add(photo15)
    db.session.add(photo16)
    db.session.add(photo17)
    db.session.add(photo18)
    db.session.add(photo19)
    db.session.add(photo20)
    db.session.add(photo21)
    db.session.add(photo22)
    db.session.add(photo23)
    db.session.add(photo24)
    db.session.add(photo25)


    album1 = Album(
        title='Nature', description='This album is a collection of landscape photos', image_url='https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg', userId=1)
    album2 = Album(
        title='Wonderful Places', description='Collection of must visit places', image_url='https://wallpapers.com/images/featured/720p-nature-background-te0eo4yinuw49nh1.jpg', userId=2)
    album3 = Album(
        title='Animals', description='Animal Collection', image_url='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',userId=3)

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
    photo2.albums.extend([album1, album2, album3])
    photo3.albums.extend([album1, album3])
    photo4.albums.extend([album1, album2])
    photo5.albums.extend([album1])
    photo6.albums.extend([album1])
    photo7.albums.extend([album1, album2])
    photo8.albums.extend([album1])
    photo9.albums.extend([album1])
    photo10.albums.extend([album1, album2])
    photo11.albums.extend([album1, album3])
    photo12.albums.extend([album1, album3])
    photo13.albums.extend([album1, album2])
    photo14.albums.extend([album1, album3])
    photo15.albums.extend([album1, album3])
    photo16.albums.extend([album1, album2])
    photo17.albums.extend([album1, album2])
    photo18.albums.extend([album1])
    photo19.albums.extend([album1, album2])
    photo20.albums.extend([album1, album2, album3])
    photo21.albums.extend([album1])
    photo22.albums.extend([album1, album2])
    photo23.albums.extend([album1,album2, album3])
    photo24.albums.extend([album1, album3])
    photo25.albums.extend([album1, album3])

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