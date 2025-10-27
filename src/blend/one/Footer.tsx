import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="section">
        <div className="container footer-content">
          {/* Left: Logo and Description */}
          <div className="footer-brand">
            <div className="logo">🚗 UC-Collection</div>
            <p className="footer-desc">
              UC-Collection helps you find, compare, and purchase quality pre-owned cars with confidence.
              Reliable, certified, and trusted by thousands of happy customers.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/cars">Cars</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/login">Sign In</a></li>
            </ul>
          </div>

          {/* Right: Contact & Social */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@uc-collection.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="footer-social">
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="footer-bottom text-center">
          <p>© {new Date().getFullYear()} UC-Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
