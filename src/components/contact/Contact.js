import React from 'react';
import sami from './assets/samii.png';
import omar from './assets/omar.png';
import './contact.css'; 

const Contact = () => {
  return (
    <div className="contact-container" id="contact">
      <h2>Contact Us</h2>
      <div className="contacts">
        <div className="contact-card">
          <img src={sami} alt="sami" className="contact-image" />
          <div className="contact-info">
            <p><strong>Local Committee Vice President IGV</strong></p>
            <p><strong>Name:</strong> Sami Mnejja</p>
            <p><strong>Email:</strong> sami.mnejja@aiesec.net</p>
            <p><strong>Phone:</strong> (+216) 28 880 729</p>
          </div>
        </div>
        <div className="contact-card">
          <img src={omar} alt="omar" className="contact-image" />
          <div className="contact-info">
            <p><strong>Local Committee Vice President IGT</strong></p>
            <p><strong>Name:</strong>Omar Souly</p>
            <p><strong>Email:</strong>omarsouly@aiesec.net</p>
            <p><strong>Phone:</strong> (+216) 96 301 129</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
