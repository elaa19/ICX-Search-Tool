import React, { useState } from "react";
import "./header.css";
import traveller from "../../assets/travller.png"; // adjust path if needed
import Logo from "../../assets/aiesecl.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // for mobile toggle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (dropdownOpen) setDropdownOpen(false); // close dropdown when closing menu
  };

  const toggleDropdown = (e) => {
    if (window.innerWidth <= 1000) {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="AIESEC logo" />
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`navbar-menu ${menuOpen ? "responsive" : ""}`}>
          <li><a href="#about">About ICX</a></li>
          <li><a href="#opportunities">Opportunities</a></li>
          <li><a href="#application-process">Application Process</a></li>
          <li><a href="#testimonials">Testimonials</a></li>

          {/* Accommodation Booklet dropdown */}
          <li className={`dropdown ${dropdownOpen ? "open" : ""}`}>
            <a
              href="#"
              className="dropdown-toggle"
              onClick={toggleDropdown}
            >
  Accommodation & cost
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  href="https://drive.google.com/drive/folders/1lTW8hALyBPElFw3JlT9asqh7Bcm2zYgY"  
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accommodation for Girls
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/folders/1Z6pPgXez4WRL2v9Nypw8ODovw46uHE47"  
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accommodation for Boys
                </a>
              </li>
               <li>
      <a
        href="https://drive.google.com/file/d/1QViVeu_7vpESyGHkq4-KLFSWPbFI18i5/view"
        target="_blank"
        rel="noopener noreferrer"
      >
        Accommodation Cost Details
      </a>
    </li>

            </ul>
          </li>

          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="header-content">
        <div className="text-content">
          <h1>
            <span className="highlight">MEDINA'S ICX SEARCH TOOL</span>
            <br />
            Discover, <span className="underline">enjoy</span>, and live the impact
          </h1>
          <p>
            This platform will help you explore our exchange opportunities, learn about the application process, and discover the Tunisian cultural aspects, all in one place.
          </p>
          <div className="cta-buttons">
            <button className="btn contact-us">Contact Us</button>
            <button className="btn learn-more">
              {/* Replace with your actual video link */}
              <a href="YOUR_VIDEO_LINK" target="_blank" rel="noopener" style={{color: 'inherit', textDecoration: 'none'}}>
                Watch EPS Video
              </a>
            </button>
          </div>
        </div>
        <div className="image-content">
          <img src={traveller} alt="Traveller" />
        </div>
      </div>
    </header>
  );
};

export default Header;