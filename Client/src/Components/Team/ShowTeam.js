import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import axios from "../../util/axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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

export default function TeamShow({ team, setUser, eventId }) {
  const classes = useStyles();
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const onSubmit = () => {
    Swal.fire({
      title: "Are you sure, you wanna leave the team?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/team/leave/${team._id}`, {})
          .then((res) => {
            setUser((prev) => {
              return {
                ...prev,
                teams: prev.teams.filter(
                  (team) =>
                    team.event.toString().trim() !== eventId.toString().trim()
                ),
              };
            });

            Swal.fire("Deleted!", `${res.data?.body}`, "success").then(() => {
              history.push("/dashboard");
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Retry!", `No changes were made !!`, "error");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/team/members/${team._id}`)
      .then((data) => {
        // console.log(data);
        setMembers(data.data.body);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item sm={2} xs={1} />
        <Grid item sm={8} xs={10}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Team Name : {team.teamName}</Typography>
          </div>
        </Grid>
        <Grid item sm={2} xs={1} />
        <Grid item sm={2} xs={1} />
        <Grid item sm={8} xs={10}>
          {members.map((data, i) => {
            return (
              <Typography key={i} variant="h6">
                {i + 1}. {data.name}
              </Typography>
            );
          })}
        </Grid>
        <Grid item sm={2} xs={1} />
        <Grid item xs={1} sm={2} />
        <Grid item xs={10} sm={8}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            Team invite Code : {team.inviteCode}
          </div>
        </Grid>
        <Grid item xs={1} sm={2} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => onSubmit()}
              style={{
                fontFamily: "oswald",
                fontWeight: "bolder",
                boxShadow: "10px 10px black",
              }}
            >
              Leave Team
            </Button>
          </div>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={12} />
      </Grid>
    </div>
  );
}
