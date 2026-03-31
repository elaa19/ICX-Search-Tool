import React from "react";
import "./opps.css";
// You can remove PapaParse since we are using GraphQL now!
import Heart from "./assets/3.4 white 1.png";
import Fingerprint from "./assets/4.4 white 1.png";
import Classroom from "./assets/4.6_1 white.png";
import Skillup from "./assets/8.6 white.png";
import Onthemap from "./assets/8.9 white.png";
import Igvf from "../icxi/assets/igvf.png";
import frozenData from "./frozen_opportunities.json";

const Opps = () => {
  const data = frozenData;
  const loading = false;
  
  const opportunityImages = {
    "Hearltbeat": Heart,
    "Fingerprint": Fingerprint,
    "Global Classroom": Classroom,
    "Skill Up!": Skillup,
    "On the Map": Onthemap,
    "Scale-up": Skillup,
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
  return (
    <div>
      <section className="opportunities" id="opportunities">
        <h2>Opportunities</h2>

        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading live opportunities from AIESEC...</p>
        ) : (
          <div className="opportunity-cards">
            {data.map((opportunity, index) => {
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
              
              const driveId = driveFolderIds[mapKey] || driveFolderIds[projectName];
              const driveUrl = driveId ? `https://drive.google.com/drive/folders/${driveId}` : null;
              
              return (
                <div className="opportunity-card" key={index}>
                  <img
                    src={opportunityImages[mapKey] || opportunityImages[projectName] || Igvf} // Added fallback image just in case
                    alt={rawProjectName}
                    className="opportunity-image"
                  />
                  <h3>{rawProjectName}</h3>
                  {opportunity["Location"] && (
                    <p><strong>Location:</strong> {opportunity["Location"]}</p>
                  )}
                  {opportunity["Accomodation Provided"] && opportunity["Accomodation Provided"] !== "Not specified" && (
                    <p><strong>Accommodation Provided:</strong> {opportunity["Accomodation Provided"]}</p>
                  )}
                  {opportunity["Accomodation Covered"] && opportunity["Accomodation Covered"] !== "Not specified" && (
                    <p><strong>Accommodation Covered:</strong> {opportunity["Accomodation Covered"]}</p>
                  )}
                  <p><strong>Fee:</strong> {opportunity["Fee (€)"]?.fee !== undefined ? `${opportunity["Fee (€)"].fee} ${opportunity["Fee (€)"].currency}` : opportunity["Fee (€)"]}</p>
                  <p><strong>Slots:</strong> {opportunity["#SLOTS"]}</p>
                  <div className="button-container">
                    <a
                      href={`https://aiesec.org/opportunity/global-volunteer/${opportunity["ID"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opportunity-link"
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
            })}
          </div>
        )}
      </section>
    </div>
  );
};
export default Opps;