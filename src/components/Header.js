import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
  handleBackClick = (e) => {
    this.props.history.goBack();
  }

  render() {
    return (
      <header className="Header">
        {this.props.showBack && 
          <button className="Header_BackBtn" onClick={this.handleBackClick}>Back</button>
        }
        <h1 className="Header__Title">Instagram Klon</h1>
      </header>
    )
  }
}



export default Header;