import React from 'react';
import logo from '../Assets/logo-gial.png';
import '../Styling/Navigation.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';  // Import HashLink

export const Navigation = () => {
  return (
    <nav className="nav-desktop">
      <ul>
        {/* Replaced href with HashLink */}
        <li><HashLink to="#home">HOME</HashLink></li>
        <li><HashLink to="#services">SERVICES</HashLink></li>
        <li><HashLink to="#gallery">GALLERY</HashLink></li>
        <li><HashLink to="#contact" className="contact-nav">CONTACT</HashLink></li>

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
