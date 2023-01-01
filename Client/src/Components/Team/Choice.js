import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Choice({ comp, setComp }) {
  const classes = useStyles();
  const createTeam = () => {
    setComp(2);
  };
  const joinButton = () => {
    setComp(3);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} item xs={12}>
        <Grid item sm={12} xs={12} />
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={8}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={createTeam}
              style={{
                backgroundColor: "rgba(239, 147, 147, 1)",
                padding: "18px 36px",
                fontSize: "18px",
                fontFamily: "oswald",
                fontWeight: "bolder",
                boxShadow: "10px 10px black",
              }}
            >
              Team Leader
            </Button>
          </div>
        </Grid>
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={8}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography align="center" variant="h6">
              OR
            </Typography>
          </div>
        </Grid>
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={2} />
        <Grid
          item
          sm={4}
          xs={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={joinButton}
              style={{
                backgroundColor: "rgba(239, 147, 147, 1)",
                padding: "18px 36px",
                fontSize: "18px",
                fontFamily: "oswald",
                fontWeight: "bolder",
                boxShadow: "10px 10px black",
              }}
            >
              Team Member
            </Button>
          </div>
        </Grid>
        <Grid item sm={4} xs={2} />
        <Grid item sm={12} xs={12} />
      </Grid>
    </div>
  );
}
