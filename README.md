# "Clickr"
## Database Schema Design -

![Schema Image](https://github.com/Richa-G22/Clickr-Project_Docs/blob/main/Images/Clickr_Database.png)

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION
Sign Up -
app.route('/', methods="POST')

Login -
app.route('/')
    Invalid Credentials:
    Error message: "Access Denied"
    Status Code: 403

Delete -
app.route('/', methods="DELETE')

# Photos-
# Users should be able to view all posted photos.
app.route('/')
# Get photos for the current user
app.route('/current')

# Users should be able to create new posts.
app.route('/', methods=["GET","POST"])

# Users should be able to update their posts.
app.route('/photos/<int:photoId>', methods=["GET","PUT"])

# Users should be able to delete their posts.
app.route('/photos/<int:photoId>', methods=["DELETE'])


# Albums-
# Users should be able to create new albums.
app.route('/', methods=["GET","POST"])

# Users should be able to update their albums.
app.route('/albums/<int:albumId>', methods=["GET","PUT"])

# Users should be able to delete their albums.
app.route('/albums/<int:albumId>', methods=["DELETE'])


# Comments-
# Users should be able to view all comments on a Photo.
app.route('/comments')

# Users should be able to create new comments on a photo.
app.route('/photos/<int:photoId>/comments', methods=["GET","POST"])

# Users should be able to update their comments on a photo.
app.route('/comments/<int:commentId>', methods=["GET","PUT"])

# Users should be able to delete their comment from a photo.
app.route('/comments/<int:commentId>', methods=["DELETE"])


# Favorites-
# Users should be able to see all photos they favorited.
app.route('/<int:userId>/favorites')

# Users should be able to favorite multiple photos.
# Users should be able to unfavorite photos.
