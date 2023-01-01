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

export default function TeamCreate({ id, setUser }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  const createTeam = async () => {
    try {
      const res = await axios.post(`/team/new/${id}`, {
        teamName: name.trim(),
      });
      setTeam(res.data.body);
      setUser((prev) => {
        return {
          ...prev,
          teams: res.data.body ? [...prev.teams, res.data.body] : prev.teams,
        };
      });
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    createTeam();
  };

  useEffect(() => {
    if (team && !error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: `Share This code : ${team.inviteCode} With your teammates`,
        backdrop: false,
        showConfirmButton: true,
      });
    }
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: error,
      }).then(() => {
        setError(null);
      });
    }
  }, [team, error]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12} />
        <Grid item sm={3} xs={1} />
        <Grid item sm={6} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="outlined-basic"
              helperText="Disclaimer : share the code with your teammates"
              label="Team Name"
              variant="outlined"
              value={name}
              onChange={(event) => changeHandler(event)}
            />
          </div>
        </Grid>
        <Grid item sm={3} xs={1} />
        <Grid item sm={2} xs={1} />
        <Grid item sm={8} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid item sm={5} xs={5}>
              <Typography variant="h6">Code Generated :</Typography>
            </Grid>
            <Grid item sm={3} xs={5}>
              <Paper elevation={3}>
                <Typography align="center" variant="body1">
                  {team && team.inviteCode}
                </Typography>
              </Paper>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={2} xs={1} />
        <Grid item sm={4} xs={1} />
        <Grid item sm={4} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                backgroundColor: "rgba(239, 147, 147, 1)",
                padding: "18px 36px",
                fontSize: "18px",
                fontFamily: "oswald",
                fontWeight: "bolder",
                boxShadow: "10px 10px black",
              }}
              variant="contained"
              onClick={(event) => onSubmit()}
            >
              Create Team
            </Button>
          </div>
        </Grid>
        <Grid item sm={4} xs={1} />
        <Grid item sm={12} xs={12} />
      </Grid>
    </div>
  );
}
