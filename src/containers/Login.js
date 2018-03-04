import React, { Component } from 'react';
import LoginHeader from "../components/LoginHeader";
import LoginInput from "../components/LoginInput";
import { Redirect } from "react-router-dom";


class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  handleLoginSuccess = token => {
    window.localStorage.setItem("token", token);

    this.setState({ redirectToReferrer: true });
  }

  render() {
    let redirectTo = '/feeds'
    if (this.props.location.state && this.props.location.state.from) {
      redirectTo = this.props.location.state.from;
    }
    
    if (this.state.redirectToReferrer) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        <LoginHeader />
        <LoginInput onSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}

export default Login;
