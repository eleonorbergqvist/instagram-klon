import React, { Component } from 'react';
import './UserHeader.css';


class UserHeader extends Component {
  render () {
    return (
      <header className="UserHeader">
        <div className="UserHeader__Avatar">
          <img className="UserHeader__AvatarImage" src={this.props.avatar} alt={this.props.userName} />
        </div>
        <p className="UserHeader__Name">{this.props.userName}</p>
      </header>
    )
  }
}

UserHeader.defaultProps = {
  avatar: 'http://via.placeholder.com/30x30',
  userName: 'Bobbilicous',
};

export default UserHeader;