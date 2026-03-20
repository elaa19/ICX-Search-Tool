import React, { useState } from "react";
import "./testi.css";

const Testi = () => {
  const videos = [
    { country: 'Algeria', id: '1IhLMcdLYyhCT--jnjBnJebgKTVZX7YcI' },
    { country: 'Egypt', id: '1o4OWkgrTyFiR_bWOQCno6YXol9lnxgOQ' },
    { country: 'India', id: '18AZFT-HbXgSar6TBqTDtKSBSOfZGe7BC' },
    { country: 'Indonesia', id: '1T4CLFPPGA9Oi2M3MGfBOfG3jb9eXVQcN' },
    { country: 'Morocco', id: '1GRQrpKeh39YAM3YZjogoQtmAaLPAhg6N' },
    { country: 'Netherlands', id: '10sjJI1x9j6AJf4nTxLF5FHKG98CKd_jS' },
    { country: 'Turkey - EP 1', id: '19AAH1Bc_Pc5AmdrlOpqe05YivVWLjpnt' },
    { country: 'Turkey - EP 2', id: '1jbc6gGHU3H9zya13mvi50d-5dekEoIeK' },
    { country: 'Turkey - EP 3', id: '1hj8jAHZGvErFlevIItoIjIa2mq5QSbwn' },
    { country: 'Turkey - EP 4', id: '1wDTTh33XGCG2KrOn_oYGRODwV01RwJE0' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div className="testimonials-container" id="testimonials">
      <div className="testimonials-header">
        <h4>TESTIMONIALS</h4>
        <h2>Watch Our Exchange Participants' Stories</h2>
        <p style={{ color: "#fff", marginTop: "1rem", marginBottom: "2rem", opacity: 0.9 }}>
          Discover the impact of our opportunities through the eyes of those who lived them!
        </p>
      </div>
      
      <div className="testimonials-carousel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <button className="carousel-btn prev" onClick={goToPrev} style={{ zIndex: 10 }}>
          &#10094;
        </button>
        <div className="testimonial-card" style={{ padding: 0, overflow: "hidden", display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '15px', width: '100%', maxWidth: '700px' }}>
          <iframe 
            src={`https://drive.google.com/file/d/${videos[currentIndex].id}/preview`} 
            width="100%" 
            height="400" 
            allow="autoplay"
            frameBorder="0" 
            title={`Testimonial from ${videos[currentIndex].country}`}
          ></iframe>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p className="testimonial-position" style={{ margin: '0', color: '#666', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Our EP from {videos[currentIndex].country}
            </p>
          </div>
        </div>
        <button className="carousel-btn next" onClick={goToNext} style={{ zIndex: 10 }}>
          &#10095;
        </button>
      </div>
      
      <div className="testimonials-navigation">
        {videos.map((_, index) => (
          <span
            key={index}
            className={`nav-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testi;
