import React from "react";
import SignIn from "./signIn";
import SignOut from "./signOut";

const NavbarComponent = ({ user }) => {
  if (user) return <SignOut />;

  return (
    <>
      <SignIn />
    </>
  );
};

export default NavbarComponent;
