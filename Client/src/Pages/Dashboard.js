import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Cards from "./Cards";
import styles from "../assets/css/EventCard.module.css";
import Team from "../Pages/Team";
import loadScript from "../util/loadScript";
import { EventContext } from "../util/eventsContext";

const DashBoard = ({ user }) => {
  useEffect(() => {
    loadScript("removeCanvas.js");
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div
      // className={classes.root}
      style={{
        width: "100%",
      }}
    >
      <div className={styles.container}>
        <div className={styles["container-in"]}>
          <Switch>
            <Route
              render={(props) => <Team user={user} {...props} />}
              path="/dashboard/team"
            />
            <Route exact component={Root} path="/dashboard" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const Root = () => {
  const { compLoading, events } = useContext(EventContext);

  return (
    <>
      {compLoading ? null : (
        <>
          {/* <NavbarComponent /> */}
          {/* Hello {user.name}! */}

          <br />
          <br />
          <br />
          <Cards cards={events} />
          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default DashBoard;
