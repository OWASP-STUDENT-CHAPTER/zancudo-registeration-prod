import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Owasp from "../../assets/logo-owasp.png";
import { useHistory, useLocation } from "react-router-dom";


const NavbarSignOut = () => {
  const history = useHistory();
  const location = useLocation();
  let btn, btnRes;

  return (
    <>
      {/* <Navbar variant="dark" className="navCustom  fixed-top" expand="lg">
        <Navbar.Brand
          href="https://owasp.co.in"
          style={{ marginTop: "4rem", marginLeft: "1rem " }}
        >
          <img
            className="logo"
            alt="LOGO"
            src={Owasp}
            style={{ width: "11vw", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            {btnRes}
          </Nav>
        </Navbar.Collapse>
        <div className="view zoom signin-desktop-view">{btn}</div>
      </Navbar> */}
      <div className="navbarprat">
        <ul>
          <li>
            <a href="">
              <img className="navbarprat-logo" alt="LOGO" src={Owasp} />
            </a>
          </li>
          {location.pathname.includes("team") ? (
            <li>
              {" "}
              <a
                onClick={() => history.goBack()}
                className="navbarprat-link"
                style={{ cursor: "pointer" }}
              >
                Back
              </a>{" "}
            </li>
          ) : (
            <li>
              <a href={`/api/user/logout`} className="navbarprat-link">
                Sign Out
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavbarSignOut;
