import React from "react";
import pic1 from "./images/pic1.png";
import pic2 from "./images/pic2.png";
import './AboutPage.css';

function About() {


    return (
        <div className="about">
            <div style={{ paddingLeft: "50em", width: "600px", zIndex: "100" }} className="content">
                <h1 style={{ paddingLeft: "1em", paddingTop: "0.5em" }} className="multicolor-text">Welcome to Clickr!!!</h1>
                <p>Clickr was developed solely for educational purpose at App Academy, keeping in mind the famous photo sharing website <span style={{fontWeight:"bold"}}> "Flickr". </span>
                    It aims at providing the user with a similar experience of sharing and exploring captivating images. </p>
                
                <h2 style={{paddingTop:"25px"}}>Features</h2>
                <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>PhotoStream</h3>
                <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                    <li>Any user can view all the photos uploaded in the website.</li>
                    <li>Clickr user can favorite/unfavorite any number of photos.</li><br></br>
                </ul>
                <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Manage</h3>
                <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                    <li>Clickr user can view all the photos uploaded by him/her.</li>
                    <li>Clickr user can upload a new photo by providing related information like Title, Description, Label.</li>
                    <li>Clickr user can update and delete any of his/her photo.</li>
                    <li>Clickr user can comment on any photo except his own.</li>
                    <li>Clickr user can update or delete his own comment on a particular photo.</li><br></br>
                </ul>
                <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Albums</h3>
                <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                    <li>Clickr user can view all of his/her albums.</li>
                    <li>Clickr user can add/delete a photo from any of the listed albums.</li>
                    <li>Clickr user can update/delete any of the listed albums.</li><br></br>
                </ul>
                <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Favorites</h3>
                <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                    <li>Clickr user can view all his favorited photos here.</li>
                    <li>Clickr user can unfavorite any of his favorited photo.</li><br></br>
                </ul>

                <h2 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Meet the Team:</h2><br></br>
                <div className="team">
                    <div>
                        <img style={{ width: "5em", height: "6em", borderRadius: "0.5rem", paddingBottom: "0px" }} src={pic1} alt="preview" /><br></br>
                        <p style={{ marginTop: "0px" }}>Komal Aher</p>
                    </div><br></br>
                    <div>
                        <img style={{ width: "5em", height: "6em", borderRadius: "0.5rem", paddingLeft: "1.5rem" }} src={pic2} alt="preview" /><br></br>
                        <p style={{ marginTop: "0px", paddingLeft: "1.5rem" }}>Richa Garg</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;