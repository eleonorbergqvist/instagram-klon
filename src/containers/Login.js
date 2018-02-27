import React, { Component } from 'react';
import LoginHeader from "../components/LoginHeader";
import LoginInput from "../components/LoginInput";


class Login extends Component {
  render() {
    return (
      <div>
        <LoginHeader />
        <LoginInput />
      </div>
    );
  }
}

export default Login;
