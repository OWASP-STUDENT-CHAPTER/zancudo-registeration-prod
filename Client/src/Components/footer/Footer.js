import React from "react"
import "./footer.css";
import { Helmet } from "react-helmet";
// import '../../assets/css/footer.css'
import Owasp from "../../assets/logo-owasp.png";
function Footer()
{
return(
    <div>
    <Helmet>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    </Helmet>

    <div className="container-fluid contactus" id="footer">
        <div className="row">
            <div className="col-md-6 contact-left">
                <img src={Owasp} className="owasp-logo-123"></img>
                <p className="owasp-content">
                    The Open Web Application Security Project (OWASP) Student chapters, Thapar University helps to teach, learn, and inspire application security.
                </p>
            </div>
            <div className="col-md-6 contact-right">
                <div className="contact-right-elements contact-main-heading">
                    Contact Us!
                </div>

                <div className="contact-right-elements">
                    <div className="row">
                        <div className="col-lg-1">
                            <a className="location" href="https://www.google.com/maps/place/TIET+-+Thapar+Institute+of+Engineering+And+Technology/@30.3564242,76.3625125,17z/data=!3m1!4b1!4m5!3m4!1s0x391028ab86533db5:0x93cc1f72eae1c9a8!8m2!3d30.3564242!4d76.3647012" target="_blank">
                                <i className="fas fa-map-marker-alt"></i></a>
                        </div>
                        <div className="col-lg-11">
                            <p className="p_1">TIET, Patiala - 147004</p>
                        </div>
                    </div>
                </div>

                <div className="contact-right-elements">
                    <div className="row">
                        <div className="col-lg-1">
                            <a href="tel: +919674603907">
                                <i className="fas fa-phone-alt"></i>
                            </a>
                        </div>
                        <div className="col-lg-11">
                            <a href="tel: +919674603907">
                                <p className="p_2">
                                    Prajit Sengupta +91 9674603907
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-right-elements socialmedia">
                    <div>
                        <a href="https://www.facebook.com/owasptsc/" target="_blank"><i className="fab fa-facebook" aria-hidden="true"></i
              ></a>
                    </div>
                    <div>
                        <a href="https://www.youtube.com/channel/UC_Qd7v56QH7UKp3u9Mu6Ksg" target="_blank"><i className="fab fa-youtube" aria-hidden="true"></i
              ></a>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/owasp_tiet/" target="_blank"><i className="fab fa-instagram" aria-hidden="true"></i
              ></a>
                    </div>
                    <div>
                        <a href="https://www.linkedin.com/company/owasp-tiet/" target="_blank"><i className="fab fa-linkedin" aria-hidden="true"></i
              ></a>
                    </div>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className="row linkrow">
            <div className="col-md-3 col-sm-6 impLinks">
                <a href="http://owasp.co.in" target="blank">Main Page</a>
            </div>
            <div className="col-md-3 col-sm-6 impLinks">
                <a href="http://owasp.co.in/#aboutUs" target="blank">About OWASP </a>
            </div>
            <div className="col-md-3 col-sm-6 impLinks">
                <a href="http://owasp.co.in/#events" target="blank">Previous Events</a>
            </div>
            <div className="col-md-3 col-sm-6 impLinks">
                <a href="https://owasp.co.in/team.html" target="blank">Our Team</a>
            </div>
        </div>
    </div>
    
    </div>
);
}
export default Footer;