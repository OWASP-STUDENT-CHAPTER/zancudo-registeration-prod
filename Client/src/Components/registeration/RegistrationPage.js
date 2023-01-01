import React from "react";
import "../../assets/css/register.css";
import "../../assets/css/form.css";
import Footer from "../footer/Footer";
import RegistrationForm from "./RegistrationForm";
import SponsorSlide2 from "../sponsor/Sponsor2"; //changed
const RegistrationPage = () => {
  return (
    <>
      <section className="pc-form-section fix">
        <div className="contact" data-aos="fade-in" data-aos-duration="2000">
          <div className="main-registration-form">
            <RegistrationForm buttonText="Sign-up with " />
          </div>
        </div>
      </section>

      {/* <section className="sponsor">
        <SponsorSlide2 />
      </section> */}

      <section className="jarvis-footer">
        <Footer />
      </section>
    </>
  );
};

export default RegistrationPage;
