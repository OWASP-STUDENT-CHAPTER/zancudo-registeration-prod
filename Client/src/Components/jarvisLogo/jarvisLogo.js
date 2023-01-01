import { Parallax, Background } from "react-parallax";
import Tilt from "react-tilt";
import logo from "../../assets/jarvis.png";
import Jio from "../sponsor/sponsorpics/JIO-RED.png";
import NSLogo from "../sponsor/sponsorpics/NSLogo-1.png";
import "./logo.css";

function JarvisLogo() {
  return (
    // For Tilt.js
    //     <div style={{marginTop:"22rem",marginLeft:"30rem"}}>
    //          <Tilt className="Tilt ind" options={{ max : 25 ,axis:null}} style={{ height: 0, width: 0 }} >
    //             <div className="Tilt-inner">
    //                 <img className="logojarvis" src={JarvisLogo} alt="JarvisLogo" width="150px"/>
    //              </div>
    //         </Tilt>
    // </div>
    <>
      <div className="logohead">
        <img className="logojarvis" src={logo} alt="JarvisLogo" width="190px" />
        <div className="title-sponsors">
          <span className="span presented-by"></span>
          {/* <div className="logos">
            <a href="https://www.jio.com/"><img className="jio" src={Jio} alt="JIO"/></a>
            <span className="span">and</span>
            <a href="https://www.newtonschool.co/"><img className="ns" src={NSLogo} alt="NSLogo"/></a>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default JarvisLogo;
