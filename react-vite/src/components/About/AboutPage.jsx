import React from "react";
import pic1 from "./images/pic1.png";



function About() {


    return (
        <div style={{paddingLeft:"2em"}}>
            <h1>About Clickr</h1>
            <p>Welcome to Clickr!!!</p>
            <p>Clickr was developed solely for educational purpose at App Academy, keeping in mind the famous photo sharing website "Flickr". <br>
            </br>This website was developed as a group effort of Komal Aher and Richa Garg. <br></br>It aims to provide the user with a similar experience of sharing and exploring captivating images. </p>
            <br>
            </br>
            <h2>Features</h2>
            <h3>PhotoStream</h3>
            <ul>
                <li>Any user can view all the photos uploaded in the website.</li>
                <li>Clickr user can favorite/unfavorite any number of photos.</li>
            </ul>
            <h3>Manage</h3>
            <ul>
                <li>Clickr user can view all the photos uploaded by him/her.</li>
                <li>Clickr user can upload a new photo by providing related information like Title, Description, Label.</li>
                <li>Clickr user can update and delete any of his/her photo.</li>
                <li>Clickr user can comment on any photo except his own.</li>
                <li>Clickr user can update or delete his own comment on a particular photo.</li>
            </ul>
            <h3>Albums</h3>
            <ul>
                <li>Clickr user can view all of his/her albums.</li>
                <li>Clickr user can add/delete a photo from any of the listed albums.</li>
                <li>Clickr user can update/delete any of the listed albums.</li>
            </ul>
            <h3>Favorites</h3>
            <ul>
                <li>Clickr user can view all his favorited photos here.</li>
                <li>Clickr user can unfavorite any of his favorited photo.</li>
            </ul>

            <h2>Meet the Team:</h2>
            <div style={{paddingBottom:"10em", display:"grid"}}>

                Komal Aher 
                <img style={{width:"5em", height:"6em", borderRadius:"0.5rem", paddingTop:"0.5rem"}}src={pic1} alt="preview" />
            </div>
        </div>
    )
}

export default About;