import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    localStorage.clear(); // clear for user
  }, []);
  return (
    <>
      <a href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}>LOGIN</a>
    </>
  );
};

export default Login;
