import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  loading,
  user,
  component: Component,
  loginRoute,
  setUser,
  ...rest
}) => {
  if (loginRoute && !loading && !user) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} setUser={setUser} user={user} loading={loading} />}
    />
  );
};

export default ProtectedRoute;
