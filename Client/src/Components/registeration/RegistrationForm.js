import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Cookie from "js-cookie";
import google from "../../assets/google.png";
import "../../App.css";

const RegistrationForm = ({ buttonText, ...rest }) => {
  const [state, setState] = useState({
    name: "",
    year: "first",
    phoneNo: "",
    rollNo: "",
    college: "",
  });
  const { name, year, phoneNo, rollNo, college } = state;

  const changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const selectHandler = (e) => {
    setState((prev) => {
      return {
        ...prev,
        year: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="animated-background">
        <Form
          {...rest}
          action={`/api/user/signup`}
          method="POST"
          className="register-form"
        >
          <div className="login-wrap">
            <h1 style={{ textAlign: "center" }} className="sign-up">
              REGISTER FOR ZANCUDO
            </h1>
            <div className="login-html">
              <div className="login-form">
                <div className="sign-up-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={name}
                      name="name"
                      required
                      onChange={(e) => changeHandler(e)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={phoneNo}
                      name="phoneNo"
                      required
                      onChange={(e) => changeHandler(e)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Roll Number
                    </label>
                    <input
                      type="number"
                      value={rollNo}
                      name="rollNo"
                      required
                      onChange={(e) => changeHandler(e)}
                      className="input"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Year
                    </label>
                    <select
                      style={{ backgroundColor: "" }}
                      name="year"
                      className="input select-input"
                      onChange={(e) => selectHandler(e)}
                      value={year}
                      required
                    >
                      <option className="" value="school">
                        School Student
                      </option>
                      <option className="" value="first">
                        {" "}
                        First Year{" "}
                      </option>
                      <option className="" value="second">
                        Second Year
                      </option>
                      <option className="" value="third">
                        Third Year
                      </option>
                      <option className="" value="fourth">
                        Fourth Year
                      </option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      College
                    </label>
                    <input
                      type="text"
                      value={college}
                      name="college"
                      required
                      onChange={(e) => changeHandler(e)}
                      className="input"
                    />
                  </div>
                  <div style={{ margin: "20px" }} className="hr"></div>
                  <div className="group">
                    <button
                      style={{ padding: "1.5px", cursor: "pointer" }}
                      type="submit"
                      className="g-sign-button"
                    >
                      <span className="g-sign">
                        {buttonText}
                        <img
                          style={{ maxHeight: "40px", maxWidth: "40px" }}
                          src={google}
                        />
                      </span>
                    </button>
                  </div>
                  <div className="foot-lnk">
                    <Form.Group style={{ display: "none" }}>
                      <Form.Control
                        name="_csrf"
                        value={Cookie.get("XSRF-TOKEN")}
                        onChange={() => {}}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default RegistrationForm;
