import React, { Component } from 'react';
import "./LoginInput.css";

class LoginInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;  

    this.setState({
      [name]: event.target.value
    });
  }

  urlencodeObject = params => {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }

  handleSubmit = event => {
    event.preventDefault();

    const body = this.urlencodeObject({
      email: this.state.email,
      password: this.state.password,
    })
    
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
      .then(response => response.json())
      .then(json => {
        this.props.onSuccess(json);
      })
  }

  render() {
    return (
      <div className="LoginInput">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="LoginInput__FieldUserEmail"></label>
          <label htmlFor="LoginInput__FieldPassword"></label>
          <input className="LoginInput__Field" id="LoginInput__FieldUserEmail" 
            type="text" name="email" value={this.state.email}
            onChange={this.handleChange} placeholder="Email"
          />
          <input className="LoginInput__Field" id="LoginInput__FieldPassword" 
            type="password" name="password" value={this.state.password}
            onChange={this.handleChange} placeholder="Lösenord" 
          />
          <input className="LoginInput__Submit" type="submit" value="Submit" 
          />
        </form>
      </div>
    );
  }
}

export default LoginInput;