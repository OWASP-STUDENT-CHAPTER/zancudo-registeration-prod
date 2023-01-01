import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import JarvisLogo from "../Components/jarvisLogo/jarvisLogo";
import RegistrationPage from "../Components/registeration/RegistrationPage";
import loadScript from "../util/loadScript";
import classes from "../Components/flipClock/flipClock.module.css";
import FlipClock from "../Components/flipClock";
const Registration = ({ user, loading }) => {
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    loadScript("backgroundJavascript.js");
  }, []);

  return (
    <>
      {/* <div style={{ display: "flex", direction: "column" }}> */}
      <div>
        <JarvisLogo />

        <div className={classes.FlipclockUpper}>
          <FlipClock />
        </div>
        <RegistrationPage />
      </div>
    </>
  );
};

export default Registration;
