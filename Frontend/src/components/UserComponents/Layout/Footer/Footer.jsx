import React from "react";
import "./Footer.css"; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Clothify</h3>
          <p>Your go-to online store for stylish clothing for Men, Women, and Kids.</p>
        </div>
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/category/men">Men</Link></li>
            <li><Link to="/category/women">Women</Link></li>
            <li><Link to="/category/kid">Kids</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Clothify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
