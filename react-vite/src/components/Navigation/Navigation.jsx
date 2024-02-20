import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlickr } from '@fortawesome/free-brands-svg-icons';
import "./Navigation.css";
import { useState } from "react";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-bar">
      <div className={`profile-dropdown ${menuOpen ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faFlickr} />
        <ProfileButton />
      </div>
      <div className="profile-button" onClick={toggleMenu}>
      </div>
    </div>
  );
}

export default Navigation;
