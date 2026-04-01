import React, { useState } from "react";
import "./opps.css";
import Heart from "./assets/3.4 white 1.png";
import Fingerprint from "./assets/4.4 white 1.png";
import Classroom from "./assets/4.6_1 white.png";
import Skillup from "./assets/8.6 white.png";
import Onthemap from "./assets/8.9 white.png";
import Igvf from "../icxi/assets/igvf.png";
import Igtf from "../icxi/assets/igtf.png";
import GreenLeaderImage from "./assets/greenleaders.png";
import RaiseYourVoiceImage from "./assets/raiseyourvoice.png";
import ScaleUpImage from "./assets/scaleup.png";
import YouthForImpactImage from "./assets/youthforimpact.png";
import AquaticaImage from "./assets/aquatica.png";
import EquifyImage from "./assets/equify.png";
import HappyBusImage from "./assets/happybus.png";
import frozenGVData from "./frozen_opportunities.json";
import frozenGTData from "./frozen_gt_opportunities.json";
import frozenGTeData from "./frozen_gte_opportunities.json";

const Opps = () => {
  const [activeTab, setActiveTab] = useState("gv");
  const [searchTerm, setSearchTerm] = useState("");

  const gvData = frozenGVData;
  const gtData = frozenGTData;
  const gteData = frozenGTeData;
  const loading = false;

  const getActiveData = () => {
    switch (activeTab) {
      case "gt": return gtData;
      case "gte": return gteData;
      default: return gvData;
    }
  };

  const data = getActiveData();

  const opportunityImages = {
    "Hearltbeat": Heart,
    "Fingerprint": Fingerprint,
    "Global Classroom": Classroom,
    "Skill Up!": Skillup,
    "On the Map": Onthemap,
    "Scale-up": ScaleUpImage,
    "Green Leader": GreenLeaderImage,
    "Raise your voice": RaiseYourVoiceImage,
    "Youth for impact": YouthForImpactImage,
    "Aquatica": AquaticaImage,
    "Equify": EquifyImage,
    "Happy Bus": HappyBusImage,
  };

  const driveFolderIds = {
    "Hearltbeat": "1d8CaX5AquzX32gV2SZsX88aw_iuNBPp6",
    "Fingerprint": "11OWnuuw5mnwsyyru-BmiPreYkHEc_7go",
    "Global Classroom": "1Zw4aAqMqU3uIFwPd4GsV2q63w1Kzg3G6",
    "Skill Up!": "1Uv-oVlphxa5rFZxX-ODrwwL4py9key1Q",
    "On the Map": "1l_co24o4f7pK3qqoq6sGsNcG0IobVWRC",
    "Green Leader": "15D5AcrM53Ua0wT-0EhCtp9qVjrH1rGyv",
    "Raise your voice": "1s5ql3MgeB5SyMNQlwvMi4zp-IaH4eG5K",
    "Scale-up": "1SYGsBb_YPInpmDXorNYdKFUYdTd-S-I4",
    "Youth for impact": "1RYl1zLp4ZlCEEmM15sL2WezBZzDEA-WQ"
  };

  // Filter opportunities based on search term
  const filteredData = data.filter((opportunity) => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    const project = (opportunity.PROJECT || "").toLowerCase();
    const location = (opportunity.Location || "").toLowerCase();
    return project.includes(term) || location.includes(term);
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const getLearnMorePath = () => {
    switch (activeTab) {
      case "gt": return "global-talent";
      case "gte": return "global-teacher";
      default: return "global-volunteer";
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "gt": return "talent";
      case "gte": return "teaching";
      default: return "volunteer";
    }
  };

  const getFallbackImage = () => {
    switch (activeTab) {
      case "gt": return Igtf;
      case "gte": return Igtf; // reuse GT image with CSS tint for GTe
      default: return Igvf;
    }
  };

  const renderCard = (opportunity, index) => {
    const rawProjectName = opportunity.PROJECT;
    // Clean up strings like "Scale Up! [4 weeks]" to "Scale Up!"
    let projectName = rawProjectName.replace(/\s*\[.*?\]\s*$/, "").trim();

    // Handle specific typos/naming differences in the hardcoded drive/image maps
    let mapKey = projectName;
    if (projectName.toLowerCase() === "heartbeat") mapKey = "Hearltbeat";
    if (projectName.toLowerCase() === "scale up!") mapKey = "Scale-up";
    if (projectName.toLowerCase() === "green leaders") mapKey = "Green Leader";
    if (projectName.toLowerCase() === "youth 4 impact" || projectName.toLowerCase() === "youth for impact") mapKey = "Youth for impact";
    if (projectName.toLowerCase() === "raise your voice") mapKey = "Raise your voice";
    if (projectName.toLowerCase() === "on the map") mapKey = "On the Map";

    const driveId = driveFolderIds[mapKey] || driveFolderIds[projectName];
    const driveUrl = driveId ? `https://drive.google.com/drive/folders/${driveId}` : null;

    const fallbackImage = getFallbackImage();
    const learnMorePath = getLearnMorePath();

    // Determine card CSS class
    const cardClass = activeTab === "gt" ? "gt-card" : activeTab === "gte" ? "gte-card" : "";
    const linkClass = activeTab === "gt" ? "gt-link" : activeTab === "gte" ? "gte-link" : "";

    return (
      <div className={`opportunity-card ${cardClass}`} key={index}>
        <img
          src={opportunityImages[mapKey] || opportunityImages[projectName] || fallbackImage}
          alt={rawProjectName}
          className={`opportunity-image ${activeTab === "gte" ? "gte-image" : ""}`}
        />
        <h3>{rawProjectName}</h3>
        {opportunity["Location"] && (
          <p><strong>Location:</strong> {opportunity["Location"]}</p>
        )}
        {activeTab === "gv" && opportunity["Accomodation Provided"] && opportunity["Accomodation Provided"] !== "Not specified" && (
          <p><strong>Accommodation Provided:</strong> {opportunity["Accomodation Provided"]}</p>
        )}
        {activeTab === "gv" && opportunity["Accomodation Covered"] && opportunity["Accomodation Covered"] !== "Not specified" && (
          <p><strong>Accommodation Covered:</strong> {opportunity["Accomodation Covered"]}</p>
        )}
        {activeTab === "gv" && (
          <p><strong>Fee:</strong> {opportunity["Fee (€)"]?.fee !== undefined ? `${opportunity["Fee (€)"].fee} ${opportunity["Fee (€)"].currency}` : opportunity["Fee (€)"]}</p>
        )}
        <p><strong>Slots:</strong> {opportunity["#SLOTS"]}</p>
        {opportunity["Duration"] && opportunity["Duration"] !== "N/A" && (
          <p><strong>Duration:</strong> {opportunity["Duration"]} weeks</p>
        )}
        <div className="button-container">
          <a
            href={`https://aiesec.org/opportunity/${learnMorePath}/${opportunity["ID"]}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`opportunity-link ${linkClass}`}
          >
            Learn More
          </a>
          {driveUrl && (
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="drive-link"
            >
              Booklet
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="opportunities" id="opportunities">
        <h2>Opportunities</h2>

        {/* Tabs */}
        <div className="opps-tabs">
          <button
            className={`opps-tab ${activeTab === "gv" ? "opps-tab-active" : ""}`}
            onClick={() => handleTabChange("gv")}
            id="tab-gv"
          >
            <img src={Igvf} alt="GV" className="tab-icon" />
            <span>Global Volunteer</span>
            <span className="tab-count">{gvData.length}</span>
          </button>
          <button
            className={`opps-tab ${activeTab === "gt" ? "opps-tab-active opps-tab-gt-active" : ""}`}
            onClick={() => handleTabChange("gt")}
            id="tab-gt"
          >
            <img src={Igtf} alt="GT" className="tab-icon" />
            <span>Global Talent</span>
            <span className="tab-count">{gtData.length}</span>
          </button>
          <button
            className={`opps-tab ${activeTab === "gte" ? "opps-tab-active opps-tab-gte-active" : ""}`}
            onClick={() => handleTabChange("gte")}
            id="tab-gte"
          >
            <img src={Igtf} alt="GTe" className="tab-icon gte-tab-icon" />
            <span>Global Teacher</span>
            <span className="tab-count">{gteData.length}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder={`Search ${getSearchPlaceholder()} opportunities...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="opportunity-search"
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="search-results-count">
              {filteredData.length} {filteredData.length === 1 ? "opportunity" : "opportunities"} found
            </p>
          )}
        </div>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading live opportunities from AIESEC...</p>
        ) : (
          <div className="opportunity-cards">
            {filteredData.length === 0 ? (
              <div className="no-results">
                <p>No opportunities match your search.</p>
                <button className="search-reset-btn" onClick={() => setSearchTerm("")}>Show all opportunities</button>
              </div>
            ) : (
              filteredData.map((opportunity, index) => renderCard(opportunity, index))
            )}
          </div>
        )}
      </section>
    </div>
  );
};
export default Opps;