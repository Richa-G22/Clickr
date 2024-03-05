import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
    <div>
        <nav className="nav-header">
            <NavLink style={{ textDecoration: "none" }}  to="/photos/">
                <div className="logo-div">
                    <i className="fa-brands fa-flickr"></i>&nbsp;&nbsp;
                    <div style={{ paddingTop: "8px" }}>Clickr</div>
                </div>
            </NavLink>

            <div className='menu'>
                  <ProfileButton user={sessionUser} />
            </div>

      </nav>
    
    <div className="nav-background-image">
        {sessionUser ?
            <div className="container"> 
                <i style={{fontSize: "40px", alignContent: "baseline", color: "white"  }}className="fa-solid fa-camera"></i>&nbsp;&nbsp;&nbsp;
                <div style={{fontSize: "30px", color: "white", fontWeight: "bold", fontFamily: "cursive"}}>{sessionUser.firstname}</div>&nbsp;&nbsp;
                <div style={{fontSize: "30px", color: "white", fontWeight: "bold", fontFamily: "cursive"}}>{sessionUser.lastname}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{fontSize: "20px", color: "white", fontFamily: "cursive"}}>{sessionUser.email}</div>
            </div>
        : <div className="container">
                <i style={{fontSize: "40px", alignContent: "baseline", color: "white"  }}className="fa-solid fa-camera"></i>&nbsp;&nbsp;&nbsp;
                <div style={{fontSize: "30px", color: "white", fontWeight: "bold", fontFamily: "cursive"}}>Explore.Love.Signup.</div>&nbsp;&nbsp;
            
        </div>}
    </div>
      {/* <img className="nav-image" src="https://images.pexels.com/photos/119404/pexels-photo-119404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="preview" /> */}
      <nav>
          <div className="bottom-menu">
              <NavLink style={{ paddingLeft: '400px' }} className="nav-links" to="/photos/">
                  About
              </NavLink>
              <NavLink style={{ paddingLeft: '250px' }} className="nav-links" to="/photos/">
                  PhotoStream
              </NavLink>
              {/* {sessionUser? */}
              <div>
                    <NavLink style={{ paddingLeft: '250px' }} className="nav-links" to="/photos/current">
                        Gallery
                    </NavLink>
                    <NavLink style={{ paddingLeft: '250px' }} className="nav-links" to="/albums/all">
                        Albums
                    </NavLink>
                    <NavLink style={{ paddingLeft: '250px' }} className="nav-links" to="/favorites">
                        Favorites
                    </NavLink>
              </div>
              {/* :null} */}
          </div>
      </nav>

      <div>
            <div className="nav-footer">
                <div><h3 className="footer-text">Clickr : Joining people through photography</h3></div>
            </div>
      </div>
  </div>
    </div>

  );
}

export default Navigation;
