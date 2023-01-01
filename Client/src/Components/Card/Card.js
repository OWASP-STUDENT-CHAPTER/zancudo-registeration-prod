import classes from "../../assets/css/EventCard.module.css";
import { Link } from "react-router-dom";
import React from "react";
const Card = ({
  card: { description, _id, name, active },
  imgSRC,
  link,
  cardStyle,
  styles,
  devfolio,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.face + " " + classes.face1} style={cardStyle}>
        <div className={classes.content}>
          <img src={imgSRC} className={classes.imgjotunheim} style={styles} />
        </div>
      </div>
      <div className={classes.face + " " + classes.face2}>
        <div className={classes.content}>
          <p className={classes.paraColor}>{description}</p>
          {devfolio ? (
            <div
              class="apply-button"
              data-hackathon-slug="layout"
              data-button-theme="light"
              style="height: 44px; width: 312px"
            ></div>
          ) : (
            <Link to={`/dashboard/team/?id=${_id}&name=${name}`}>Team</Link>
          )}
          {/* <Link to={`/dashboard/team/?id=${_id}&name=${name}`}>Team</Link> */}
          {/* <a href={active ? link : "#"}>coming soon</a> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
