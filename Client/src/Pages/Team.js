import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import Choice from "../Components/Team/Choice";
import TeamJoin from "../Components/Team/TeamJoin";
import TeamCreate from "../Components/Team/TeamCreate";
import ShowTeam from "../Components/Team/ShowTeam";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../../src/assets/css/button.css";
import axios from "../util/axios";
// import "../removeCanvas.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "200px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Team(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await axios.get("/user/profile");
      setUser(res.data.body);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    loadUser();
    setLoading(false);
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(null);
  const [presentTeam, setPresentTeam] = useState(null);
  const isTeamPresent = (teams, eventId) => {
    for (const team of teams) {
      if (team.event.toString().trim() === eventId.trim()) {
        setPresentTeam(team);
        return true;
      }
    }
    return false;
  };

  const [comp, setComp] = useState(0);

  useEffect(() => {
    const parsed = queryString.parse(history.location.search);
    if (!parsed || !parsed.id || !parsed.name) {
      history.push("/dashboard");
    } else {
      setState({
        name: parsed.name.trim(),
        id: parsed.id.trim(),
      });
      if (user) {
        if (isTeamPresent(user.teams, parsed.id.toString().trim())) {
          setComp(4);
        } else {
          setComp(1);
        }
      }
    }

    // eslint-disable-next-line
  }, [user]);

  const render = () => {
    const compMap = {
      0: <LinearProgress />,
      1: <Choice comp={comp} setComp={setComp} />,
      2: <TeamCreate user={props.user} setUser={props.setUser} id={state.id} />,
      3: <TeamJoin user={props.user} setUser={props.setUser} id={state.id} />,
      4: (
        <ShowTeam
          eventId={state.id}
          user={props.user}
          setUser={setUser}
          team={presentTeam}
        />
      ),
    };

    return compMap[comp];
  };
  return (
    <div style={{ width: "100%", height: "900px" }}>
      <Grid
        container
        spacing={3}
        style={{
          position: "absolute",
          margin: "auto",
          width: "100%",
          top: "30vh",
        }}
      >
        {state ? (
          <>
            <Grid item xs={12}>
              <Typography
                align="center"
                style={{ color: "white" }}
                variant="h3"
              >
                {state.name.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6}>
              <Paper
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.25)",
                  boxShadow: "10px 10px 10px 10px rgba(0,0,0,0.5)",
                }}
              >
                {render()}
                {/* <Switch>
                  <Route
                    exact
                    path={props.match.url}
                    render={(props) => <Choice {...props} id={state.id} />}
                  />
                  <Route
                    path="http://localhost:3000/dashboard/team/create"
                    component={TeamCreate}
                  />
                  <Route
                    path="http://localhost:3000/dashboard/team/join"
                    component={TeamJoin}
                  />
                </Switch> */}
              </Paper>
            </Grid>
            <Grid item xs={false} sm={3} />
          </>
        ) : null}
      </Grid>
    </div>
  );
  // return (
  //   <div className={classes.root}>
  //     {/* <a style={{textAlign:"center"}}href="http://localhost:3000/dashboard" class="btn1 btn-1">
  //     <svg>
  //       <rect x="0" y="0" fill="none" width="100%" height="100%"/>
  //     </svg>
  //          &larr;   Dashboard
  //     </a> */}
  //     <Grid
  //       container
  //       spacing={3}
  //       style={{
  //         position: "absolute",
  //         margin: "auto",
  //         width: "100%",
  //         top: "30vh",
  //       }}
  //     >
  //       {state ? (
  //         <>
  //           <Grid item xs={12}>
  //             <Typography
  //               align="center"
  //               style={{ color: "white" }}
  //               variant="h3"
  //             >
  //               {state.name.toUpperCase()}
  //             </Typography>
  //           </Grid>
  //           <Grid item xs={false} sm={3} />
  //           <Grid item xs={12} sm={6}>
  //             <Paper style={{ borderRadius: "20px" }}>
  //               {render()}
  //               {/* <Switch>
  //                 <Route
  //                   exact
  //                   path={props.match.url}
  //                   render={(props) => <Choice {...props} id={state.id} />}
  //                 />
  //                 <Route
  //                   path="http://localhost:3000/dashboard/team/create"
  //                   component={TeamCreate}
  //                 />
  //                 <Route
  //                   path="http://localhost:3000/dashboard/team/join"
  //                   component={TeamJoin}
  //                 />
  //               </Switch> */}
  //             </Paper>
  //           </Grid>
  //           <Grid item xs={false} sm={3} />
  //         </>
  //       ) : null}
  //     </Grid>
  //   </div>
  // );
}
