import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>  
      <button onClick={toggleMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fas fa-user" />
      </button>

      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              {/* <li>
                <NavLink to="/">Home</NavLink>
              </li> */}

              {/* <div style={{display: "flex",alignContent:"center", justifyContent:"center",flexDirection: "column",paddingBottom: "5px", paddingLeft: "5px", paddingRight: "5px", border: "solid 2px", borderTop: "solid 2px"}}>
                  <div style={{position:"relative", zIndex: "1"}}>{user.username}</div>
                  <div style={{position:"relative", zIndex: "1"}}>{user.email}</div>
              </div> */}
              <br></br><br></br><br></br>
              <div style={{ display: "flex", alignContent: "center", justifyContent: "center", padding: "5px", borderBottom: "solid 2px", borderRight: "solid 2px", borderLeft: "solid 2px", paddingBottom: "0px" }} className="logout-button">
                <button style={{ position: "absolute", zIndex: "1", borderRadius: "0.5rem", width: "70px", boxShadow: "2px 2px" }} onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <div style = {{paddingRight: "60px", display:"flex", alignContent:"center", justifyContent:"center", paddingTop:"5px"}}>
              <div>
              <OpenModalMenuItem 
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
