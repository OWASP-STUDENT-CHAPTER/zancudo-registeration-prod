import React from "react";
import moment from "moment";
import classes from "./flipClock.module.css";
// function component
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`${classes.flipCard} ${classes[animation]}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={classes[position]}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit + 1;

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === 60 ? 0 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className={classes.flipUnitContainer}>
        <StaticCard position={"upperCard"} digit={currentDigit} />
        <StaticCard position={"lowerCard"} digit={previousDigit} />
        <AnimatedCard digit={digit1} animation={animation1} />
        <AnimatedCard digit={digit2} animation={animation2} />
      </div>
      <div>
        <h1>{unit} </h1>
      </div>
    </div>
  );
};

// class component
class FlipClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      daysShuffle: false,
      hours: 0,
      hoursShuffle: false,
      minutes: 0,
      minutesShuffle: false,
      seconds: 0,
      secondsShuffle: false,
      // currentTime: 1366547400,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    // var eventTime = 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT

    // const eventTime = new Date("July 21, 2021 01:15:00"); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
    const eventTime = moment("January 20, 2023 00:00:00").unix();
    // .milliseconds(); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
    const currentTime = moment().unix();

    // const currentTime = moment().utc();

    // console.log(eventTime);

    // var ; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
    // var

    const diffTime = eventTime - currentTime;
    // this.state.currentTime = this.state.currentTime + 1;
    const duration = moment.duration(diffTime * 1000, "milliseconds");
    const interval = 1000;
    // duration = moment.duration(duration - interval, 'milliseconds');
    const days = duration.days(),
      hours = duration.hours(),
      minutes = duration.minutes(),
      seconds = duration.seconds();

    // // get new date
    // const finalTime = new Date("July 29, 2021 02:30:00");
    // // console.log("dd",finalTime);
    // const time = new Date();

    // console.log(`finalTime`, finalTime);
    // console.log(`time`, time);

    // const date2 = finalTime - time;
    // console.log("date2 ", date2);

    // // set time units
    // // var hours=Math.floor()
    // const hours = Math.floor(date2 / 86400000);
    // const minutes = Math.abs(finalTime.getHours() - time.getHours());
    // const seconds = Math.abs(finalTime.getMinutes() - time.getMinutes());

    // const ss = Math.abs(finalTime.getSeconds() - time.getSeconds());

    // console.log("ss ", ss);

    // // on hour chanage, update hours and shuffle state

    // console.log(
    //   "days",
    //   days,
    //   "hours ",
    //   hours,
    //   "mun ",
    //   minutes,
    //   "secs",
    //   seconds
    // );

    if (days !== this.state.days) {
      const daysShuffle = !this.state.daysShuffle;
      this.setState({
        days,
        daysShuffle,
      });
    }
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle,
      });
    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle,
      });
    }
    // // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds,
        secondsShuffle,
      });
    }
  }

  render() {
    // state object destructuring
    const {
      days,
      hours,
      minutes,
      seconds,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
    } = this.state;

    return (
      <div className={classes.cont}>
        <div className={classes.flipClock}>
          <FlipUnitContainer unit={"Days"} digit={days} shuffle={daysShuffle} />
          <FlipUnitContainer
            unit={"Hours"}
            digit={hours}
            shuffle={hoursShuffle}
          />
          <FlipUnitContainer
            unit={"Minutes"}
            digit={minutes}
            shuffle={minutesShuffle}
          />
          <FlipUnitContainer
            unit={"Seconds"}
            digit={seconds}
            shuffle={secondsShuffle}
          />
        </div>
      </div>
    );
  }
}

export default FlipClock;
