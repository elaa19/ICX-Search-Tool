import React, { useEffect, useState } from "react";
import "./opps.css";
import Papa from "papaparse";
import Heart from "./assets/3.4 white 1.png";
import Fingerprint from "./assets/4.4 white 1.png";
import Classroom from "./assets/4.6_1 white.png";
import Skillup from "./assets/8.6 white.png";
import Onthemap from "./assets/8.9 white.png";

const Opps = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sheetUrl =
      "https://docs.google.com/spreadsheets/d/1F1RQOMYBWk1Wj_evdchuSi8FDnVjs9DA2q1ytAj7v7E/gviz/tq?tqx=out:csv&sheet=iGV%20Opportuinities";

    fetch(sheetUrl)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            setData(result.data.filter((row) => row.Statues === "Open"));
          },
          header: true,
        });
      })
      .catch((error) => console.error("Error fetching the sheet:", error));
  }, []);

  const opportunityImages = {
    "Hearltbeat": Heart,
    "Fingerprint": Fingerprint,
    "Global Classroom": Classroom,
    "Skill Up!": Skillup,
    "On the Map": Onthemap,
  };

  // Mapping des noms de projets (clé = valeur de opportunity.PROJECT) vers les IDs des dossiers Drive
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
            const projectName = opportunity.PROJECT;
            const driveId = driveFolderIds[projectName];
            const driveUrl = driveId ? `https://drive.google.com/drive/folders/${driveId}` : null;

            return (
              <div className="opportunity-card" key={index}>
                <img
                  src={opportunityImages[projectName]}
                  alt={projectName}
                  className="opportunity-image"
                />
                <h3>{projectName}</h3>
                <p><strong>Start Date:</strong> {opportunity["Start date"]}</p>
                <p><strong>End Date:</strong> {opportunity["End date"]}</p>
                <p><strong>Accomodation:</strong> {opportunity["Accomodation"]}</p>
                <p><strong>Fee:</strong> {opportunity["Fee (€)"]}</p>
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
      </section>
    </div>
  );
};

export default Opps;