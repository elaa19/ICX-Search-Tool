import React, { useState, useEffect } from "react";
import "./opps.css";
import Heart from "./assets/3.4 white 1.png";
import Fingerprint from "./assets/4.4 white 1.png";
import Classroom from "./assets/4.6_1 white.png";
import Skillup from "./assets/8.6 white.png";
import Onthemap from "./assets/8.9 white.png";
import Scaleup from "./assets/scaleup.png";
import Greenleader from "./assets/greenleaders.png";
import Youthforimpact from "./assets/youthforimpact.png";
import Raiseyourvoice from "./assets/raiseyourvoice.png";

import oppsData from "../../data/opps_data.json";

const Opps = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(oppsData);
  }, []);

  const opportunityImages = {
    "Hearltbeat": Heart,
    "Fingerprint": Fingerprint,
    "Global Classroom": Classroom,
    "Skill Up!": Skillup,
    "On the Map": Onthemap,
    "Green Leader": Greenleader,
    "Raise your voice": Raiseyourvoice,
    "Scale-up": Scaleup,
    "Youth for impact": Youthforimpact,
  };  // Mapping des noms de projets (clé = valeur de opportunity.PROJECT) vers les IDs des dossiers Drive
  const driveFolderIds = {
    "Hearltbeat": "1d8CaX5AquzX32gV2SZsX88aw_iuNBPp6",   // Heartbeat
    "Fingerprint": "11OWnuuw5mnwsyyru-BmiPreYkHEc_7go", // Finger Print
    "Global Classroom": "1Zw4aAqMqU3uIFwPd4GsV2q63w1Kzg3G6",
    "Skill Up!": "1Uv-oVlphxa5rFZxX-ODrwwL4py9key1Q",   // Skill-up
    "On the Map": "1l_co24o4f7pK3qqoq6sGsNcG0IobVWRC",  // On the map
    "Green Leader": "15D5AcrM53Ua0wT-0EhCtp9qVjrH1rGyv",
    "Raise your voice": "1s5ql3MgeB5SyMNQlwvMi4zp-IaH4eG5K",
    "Scale-up": "1SYGsBb_YPInpmDXorNYdKFUYdTd-S-I4",
    "Youth for impact": "1RYl1zLp4ZlCEEmM15sL2WezBZzDEA-WQ"
  };

  return (
    <div>
      <section className="opportunities" id="opportunities">
        <h2>Opportunities</h2>
        <div className="opportunity-cards">
          {data.map((opportunity, index) => {
            // Determine project type based on title for the image/folder mapping
            let projectKey = "Hearltbeat"; // Default
            const titleUpper = opportunity.title ? opportunity.title.toUpperCase() : "";
            
            if (titleUpper.includes("HEARTBEAT") || titleUpper.includes("HEART BEAT")) {
               projectKey = "Hearltbeat";
            } else if (titleUpper.includes("FINGERPRINT") || titleUpper.includes("FINGER PRINT")) {
               projectKey = "Fingerprint";
            } else if (titleUpper.includes("GLOBAL CLASSROOM")) {
               projectKey = "Global Classroom";
            } else if (titleUpper.includes("SKILL") && titleUpper.includes("UP")) {
               projectKey = "Skill Up!";
            } else if (titleUpper.includes("ON THE MAP") || titleUpper.includes("MAP")) {
               projectKey = "On the Map";
            } else if (titleUpper.includes("GREEN LEADER")) {
               projectKey = "Green Leader";
            } else if (titleUpper.includes("RAISE") && titleUpper.includes("VOICE")) {
               projectKey = "Raise your voice";
            } else if (titleUpper.includes("SCALE") && titleUpper.includes("UP")) {
               projectKey = "Scale-up";
            } else if (titleUpper.includes("YOUTH") && titleUpper.includes("IMPACT")) {
               projectKey = "Youth for impact";
            }

            const driveId = driveFolderIds[projectKey];
            const driveUrl = driveId ? `https://drive.google.com/drive/folders/${driveId}` : null;

            // Extract correct start, end dates and duration from available_slots or title
            let startDate = "N/A";
            let endDate = "N/A";
            if (opportunity.available_slots && opportunity.available_slots.length > 0) {
              startDate = new Date(opportunity.available_slots[0].start_date).toLocaleDateString();
              endDate = new Date(opportunity.available_slots[0].end_date).toLocaleDateString();
            }

            // Extract duration from title (e.g., "[6 weeks]")
            let duration = "N/A";
            const durationMatch = opportunity.title ? opportunity.title.match(/\[(\d+)\s+week/i) : null;
            if (durationMatch && durationMatch[1]) {
              duration = durationMatch[1];
            }

            return (
              <div className="opportunity-card" key={index}>
                <img
                  src={opportunityImages[projectKey] || Heart}
                  alt={opportunity.title}
                  className="opportunity-image"
                />
                <h3>{opportunity.title}</h3>
                <p><strong>Location:</strong> {opportunity.location}</p>
                <p><strong>Duration:</strong> {duration} weeks</p>
                <p><strong>Start Date:</strong> {startDate}</p>
                <p><strong>End Date:</strong> {endDate}</p>
                <p><strong>Slots:</strong> {opportunity.openings}</p>
                <p><strong>Accommodation:</strong> Provided and Covered</p>

                <div className="button-container">
                  <a
                    href={`https://aiesec.org/opportunity/global-volunteer/${opportunity.id}`}
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
      </section>
    </div>
  );
};

export default Opps;