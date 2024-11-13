import React from 'react';
import handyman from '../Assets/handyman.jpg';
import logo from '../Assets/logo-gial.png';
import { Navigation } from '../Components/Navigation';
import { motion } from 'framer-motion';
import '../Styling/Hero.css';

export const Hero = () => {
  return (
    <section className='hero-page page' id='home'>
      {/* Background Image with Parallax Effect */}
      <motion.img
        src={handyman}
        alt="man-standing-with-construction-belt"
        className='background-image'
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <div className="hero-container">
        {/* Logo with Hover Effect */}
        <motion.img
          src={logo}
          alt="gial-services-logo"
          className='logo-hero-mb'
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        
        <Navigation />
        
        <div className='text-container'>
          {/* Main Heading Animation */}
          <motion.h1
            className='heading'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span>Transforming homes</span> in Lee, Charlotte and Collier County.
          </motion.h1>
          
          {/* Description Paragraph with Delayed Fade-In */}
          
          {/* Button Group with Scale Effect on Hover */}
          <div className="btn-group">
            <motion.a href="#contact">
              <motion.button
                tabIndex='-1'
                className='quote-btn'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Contact Us
              </motion.button>
            </motion.a>
            <motion.a href="#services">
              <motion.button
                tabIndex='-1'
                className='learn-more-btn'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                VIEW SERVICES
              </motion.button>
            </motion.a>
          </div>
          
          {/* Call to Action with Bouncing Effect */}
          <motion.h2
            className='mb-cta'
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <a href="tel:7867507518" tabIndex='0'>Call Now:<br /> (786)750-7518</a>
          </motion.h2>
        </div>
      </div>
    </section>
  );
};
