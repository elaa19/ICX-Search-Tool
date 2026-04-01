import React from "react";
import "./icxi.css";
import IGVF from "./assets/igvf.png";
import IGTF from "./assets/igtf.png";

const Icxi = () => {
  return (
    <div className="icxi-container"  id="about">
      <h2 className="icxi-title">ICX In Medina</h2>
      <div className="cards-container">
        <div className="cardi">
          <img src={IGVF} alt="IGVF" />
          <div className="cardi-title">IGV <br></br>(Incoming Global Volunteer)</div>
          <div className="cardi-text">
          Hosting global volunteers for social projects aligned with the UN's Sustainable Development Goals(SDG).
          </div>
        </div>
        <div className="cardi">
          <img src={IGTF} alt="IGTF" />
          <div className="cardi-title">IGTa <br></br> (Incoming Global Talent)</div>
          <div className="cardi-text">
          Bringing international talent for professional internships in fields like IT, marketing, or business.
          </div>
        </div>
        <div className="cardi gte-cardi">
          <img src={IGTF} alt="IGTe" className="gte-cardi-img" />
          <div className="cardi-title">IGTe <br></br> (Incoming Global Teacher)</div>
          <div className="cardi-text">
          Hosting international teachers and educators to support language education and cultural exchange in local schools and communities.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Icxi;
