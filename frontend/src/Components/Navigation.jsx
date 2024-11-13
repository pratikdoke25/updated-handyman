import React from 'react';
import logo from '../Assets/logo-gial.png';
import '../Styling/Navigation.css';
import { Link } from 'react-router-dom';  // Import Link for navigation between pages

export const Navigation = () => {
  return (
    <nav className="nav-desktop">
      <ul>
        {/* Replaced href with Link */}
        <li><Link to="#home">HOME</Link></li>
        <li><Link to="#services">SERVICES</Link></li>
        <li><Link to="#gallery">GALLERY</Link></li>
        <li><Link to="#contact" className="contact-nav">CONTACT</Link></li>

        {/* Login and Register Dropdowns */}
        <li className="dropdown">
          <span className="dropbtn">LOGIN</span>
          <div className="dropdown-content">
            <Link to="/user-login">User Login</Link>
            <Link to="/vendor-login">Vendor Login</Link>
          </div>
        </li>

        <li className="dropdown">
          <span className="dropbtn">REGISTER</span>
          <div className="dropdown-content">
            <Link to="/user-register">User Register</Link>
            <Link to="/vendor-register">Vendor Register</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};
