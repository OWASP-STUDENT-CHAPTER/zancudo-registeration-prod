import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import "./register.css";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";
import ErrorPage from "./Pages/ErrorPage";
import axios from "./util/axios";
import TeamShow from "./Components/Team/ShowTeam";
import NavbarComponent from "./Components/Navbar/Navbar";
import { EventProvider } from "./util/eventsContext";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await axios.get("/user/profile");
      setUser(res.data.body);
    } catch (error) {}
  };

  useEffect(() => {
    loadUser();
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <EventProvider>
        <Router>
          <NavbarComponent user={user} />
          {!loading ? (
            <Switch>
              {/* <ProtectedRoute
              exact
              path="/dashboard/team"
              loginRoute
              loading={loading}
              user={user}
              setUser={setUser}
              component={Team}
            /> */}
              <ProtectedRoute
                exact
                path="/"
                component={Registration}
                loading={loading}
                user={user}
              />
              <ProtectedRoute
                path="/dashboard"
                component={Dashboard}
                loading={loading}
                user={user}
                loginRoute
              />

              <Route path="/error" component={ErrorPage} />
              <ProtectedRoute path="/dashboard/show" component={TeamShow} />
            </Switch>
          ) : (
            <></>
          )}
        </Router>
      </EventProvider>
    </div>
  );
};

export default App;
