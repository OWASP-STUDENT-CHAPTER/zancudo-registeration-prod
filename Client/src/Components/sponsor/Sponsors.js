import React from "react";
import codechef from "./sponsorpics/codechef.png";
import codeasylums from "./sponsorpics/codeasylums.png";
import replit from "./sponsorpics/replit-03.png";
import codingblocks from "./sponsorpics/codingblocks.png";
import wolfram from "./sponsorpics/wolfram.png";
import gfg from "./sponsorpics/gfg-03.png";
import codingninjas from "./sponsorpics/CNLOGO.svg";
import "../../assets/css/sponsor.css";

const SponsorSlide = () => {
  return (
    <>
      <div className="sponsor-slider">
        <h2 style={{ textAlign: "center", fontFamily: "inherit" }}>
          Powered by:
        </h2>
        {/* <div className="slider">
          <div className="slider-track">
            <div className="slide">
              <img src={codechef} alt="CodeChef" />
            </div>
            <div className="slide">
              <img src={codeasylums} alt="Code Asylums" />
            </div>
            <div className="slide">
              <img src={codingblocks} alt="Coding Blocks" />
            </div>
            <div className="slide">
              <img src={replit} alt="Replit" />
            </div>
            <div className="slide">
              <img src={wolfram} alt="Wolfram Language" />
            </div>
            <div className="slide">
              <img src={gfg} alt="GeeksforGeeks" />
            </div>
            <div className="slide">
              <img src={codingninjas} alt="Coding Ninjas" />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SponsorSlide;
