import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "../../util/axios";
import Swal from "sweetalert2";

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

export default function TeamJoin({ id, setUser }) {
  const classes = useStyles();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const joinTeam = async () => {
    try {
      const res = await axios.post(`/team/join/${id}`, {
        inviteCode: code.trim(),
      });
      setMessage(res.data.body.message);
      setUser((prev) => {
        return {
          ...prev,
          teams: res.data.body.team
            ? [...prev.teams, res.data.body.team]
            : prev.teams,
        };
      });
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const changeHandler = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = () => {
    joinTeam();
  };

  useEffect(() => {
    if (message) {
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: message,
        timer: 2500,
      }).then(() => {
        setMessage(null);
      });
    }
    if (error) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: error,
        timer: 2500,
      }).then(() => {
        setError(null);
      });
    }
  }, [message, error]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item sm={3} xs={1} />
        <Grid item sm={6} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Enter Your Team Code :</Typography>
          </div>
        </Grid>
        <Grid item sm={3} xs={1} />
        <Grid item sm={2} xs={1} />
        <Grid item sm={8} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="outlined-basic"
              label="Code"
              variant="outlined"
              value={code}
              onChange={(event) => changeHandler(event)}
            />
          </div>
        </Grid>
        <Grid item xs={1} sm={2} />
        <Grid item sm={4} xs={2} />
        <Grid item sm={4} xs={8}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgba(239, 147, 147, 1)",
                padding: "18px 36px",
                fontSize: "18px",
                boxShadow: "10px 10px black",
                fontFamily: "oswald",
                fontWeight: "bolder",
              }}
              onClick={(event) => onSubmit()}
            >
              Join Team
            </Button>
          </div>
        </Grid>
        <Grid item sm={4} xs={2} />
        <Grid item xs={12} />
      </Grid>
    </div>
  );
}
