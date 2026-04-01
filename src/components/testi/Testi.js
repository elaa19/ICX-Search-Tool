import React, { useState } from "react";
import "./testi.css";

const Testi = () => {
  // Google Drive video file IDs for testimonials
  // To add more videos: get the file ID from your Google Drive share link
  // e.g., https://drive.google.com/file/d/FILE_ID/view → use FILE_ID
  const testimonialVideos = [
    {
      id: "VIDEO_ID_1",
      title: "Volunteer Experience in Tunisia",
      name: "Testimonial 1",
      project: "AIESEC Medina",
    },
    {
      id: "VIDEO_ID_2",
      title: "My Global Volunteer Journey",
      name: "Testimonial 2",
      project: "AIESEC Medina",
    },
    {
      id: "VIDEO_ID_3",
      title: "Cultural Exchange Experience",
      name: "Testimonial 3",
      project: "AIESEC Medina",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialVideos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialVideos.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = testimonialVideos[currentIndex];

  return (
    <div className="testimonials-container" id="testimonials">
      <div className="testimonials-header">
        <h4>TESTIMONIALS</h4>
        <h2>Hear From Our Volunteers</h2>
      </div>
      <div className="testimonials-carousel">
        <button className="carousel-btn prev" onClick={goToPrev} aria-label="Previous testimonial">
          &#10094;
        </button>
        <div className="testimonial-card video-card">
          <div className="video-wrapper">
            {currentVideo.id.startsWith("VIDEO_ID") ? (
              <div className="video-placeholder">
                <div className="placeholder-icon">🎬</div>
                <p>Testimonial videos coming soon!</p>
                <p className="placeholder-hint">Add your Google Drive video IDs to Testi.js</p>
              </div>
            ) : (
              <iframe
                src={`https://drive.google.com/file/d/${currentVideo.id}/preview`}
                title={currentVideo.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="testimonial-video"
              ></iframe>
            )}
          </div>
          <h4 className="testimonial-name">{currentVideo.title}</h4>
          <p className="testimonial-position">{currentVideo.name} — {currentVideo.project}</p>
        </div>
        <button className="carousel-btn next" onClick={goToNext} aria-label="Next testimonial">
          &#10095;
        </button>
      </div>
      <div className="testimonials-navigation">
        {testimonialVideos.map((_, index) => (
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
