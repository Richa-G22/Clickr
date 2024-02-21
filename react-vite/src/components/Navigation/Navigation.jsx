import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-menu">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="profile-button">
        <ProfileButton />
      </li>
    </ul>
    <div> 
        <nav className="nav-header">
            <NavLink style={{ textDecoration: "none" }}  to="/">
                <div className="logo-div">
                    <i className="fa-brands fa-flickr"></i>&nbsp;&nbsp;
                    <div style={{ paddingTop: "8px" }}>Clickr</div>       
                </div> 
            </NavLink>
 
            <div className='menu'>
                  <ProfileButton user={sessionUser} />
            </div>
            
      </nav>

      <img className="nav-image" src="https://images.pexels.com/photos/119404/pexels-photo-119404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="preview" />
      <nav style={{extDecoration: "none" }} className="nav-links">
          <div style={{borderbottom: '1px, solid, black '}} className="bottom-menu">
              <NavLink style={{ textDecoration: "none", paddingLeft: '250px' }}  to="/">
                  <div style={{ paddingTop: "2px", color: "black" }}>PhotoStream</div>        
              </NavLink>
              <NavLink style={{ textDecoration: "none", paddingLeft: '150px' }}  to="/albums/all">
                  <div style={{ paddingTop: "2px", color: "black" }}>Albums</div>        
              </NavLink>
          </div>
      </nav> 
  </div> 
  );
}

export default Navigation;
