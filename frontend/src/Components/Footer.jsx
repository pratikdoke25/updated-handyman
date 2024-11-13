import React from 'react';
import logo from '../Assets/gial-logo-footer.png';
import { IoIosHammer, IoLogoGoogle } from 'react-icons/io';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import '../Styling/Footer.css';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        {/* Sitemap Section */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul className="footer-list">
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact and Socials Section */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <div className="phone-contact">
            <span>Customer Support:</span> <a href="tel:+1234567890">(123) 456-7890</a><br />
            <span>Email:</span> <a href="mailto:info@website.com">info@website.com</a>
          </div>
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com" aria-label="Facebook Page" target="_blank" rel="noreferrer">
                <AiOutlineFacebook size="1.5rem" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" aria-label="Instagram Page" target="_blank" rel="noreferrer">
                <AiOutlineInstagram size="1.5rem" />
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/ExampleLocation" aria-label="Google Maps Location" target="_blank" rel="noreferrer">
                <IoLogoGoogle size="1.5rem" />
              </a>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h2>About Us</h2>
          <p>We are a leading provider of construction services, with over 20 years of experience in the industry.</p>
          <ul className="footer-list">
            <li>Established in 2004</li>
            <li>Global Presence</li>
            <li>Expert Team</li>
          </ul>
        </div>
      </div>

      {/* Footer Icon for additional style */}
      <div className="footer-icon">
        <IoIosHammer size="4rem" />
      </div>

      {/* Copyright Section */}
      <p className="copyright">© 2024 Site Name. Designed by [Your Name]. All rights reserved.</p>
    </footer>
  );
};
