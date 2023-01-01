import React, { Component } from "react";
import queryString from "query-string";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class SuccessPage extends Component {
  state={
    show:true
  }
  clickHandle = () => {

  }
  render() {
    return (
      <>
        <div>
          <SweetAlert
            show={this.state.show}
            title="Message"
            type="success"
            text={queryString.parse(this.props.location.search).msg}
            onConfirm={() => {
              this.setState({ show: false });
              this.props.history.push('/dashboard');
              }}
          />
        </div>
      </>
    );
  }
};

export default SuccessPage;
