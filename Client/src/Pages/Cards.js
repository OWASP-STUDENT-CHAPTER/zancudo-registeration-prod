import classes from "../assets/css/EventCard.module.css";
import imgarcadium from "../assets/images/icognito.png";
import imgjotunheim from "../assets/images/layoutlogo.png";
// import imgvalkyrie from "../assets/images/valkyrielogo.png";
import Card from "../Components/Card/Card";
import React from "react";
const Cards = ({ cards }) => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if (cards.length === 0) return <></>;
  return (
    <div>
      <div
        className={`${classes["container-in-in"]} ${classes["container-in-top"]}`}
      >
        <Card
          card={cards[0]}
          imgSRC={imgarcadium}
          id={cards[0]._id}
          name={cards[0].name}
          link={cards[0].link}
          open={cards[0].open}
          active={cards[0].active}
          devfolio={false}
          styles={{
            position: "relative",
            left: "10px",
            top: "-10px",
            "padding-top": "35px",
            "padding-right": "20px",
            scale: "2",
          }}
          cardStyle={{
            "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 40%)",
            "border-radius": "0% 0% 0% 00%",
            "margin-top": "-200px",
            // "border-left": "solid black 1px",
          }}
        />
        <Card
          card={cards[1]}
          imgSRC={imgjotunheim}
          id={cards[1]._id}
          name={cards[1].name}
          link={cards[1].link}
          open={cards[1].open}
          active={cards[1].active}
          devfolio={false}
          layout={true}
          styles={{
            position: "relative",
            left: "-5px" + "!important",
            scale: "1.25",
            top: "-5px",
            "padding-top": "50px",
          }}
          cardStyle={{
            "clip-path": "polygon(00% 40%, 0% 100%, 100% 100%, 100% 0%)",
            "border-radius": "0% 0% 0% 0%",
            "margin-top": "100px",
            // "border-right": "solid black 1px",
            "box-shadow": "0 0 0 1000px",
          }}
        />
      </div>
    </div>
  );
};

export default Cards;
