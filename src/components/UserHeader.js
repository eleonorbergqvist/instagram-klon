import React, { Component } from 'react';
import './UserHeader.css';
import { Link } from 'react-router-dom';


class UserHeader extends Component {
  render () {
    return (
      <header className="UserHeader">
        <div className="UserHeader__Avatar">
          <img className="UserHeader__AvatarImage" src={"http://localhost:8080/public/" + this.props.avatar} alt={this.props.userName} />
        </div>
        <Link className="UserHeader__Name" to={'/users/'+this.props.userName}>{this.props.userName}</Link>
      </header>
    )
  }
}

UserHeader.defaultProps = {
  avatar: 'http://via.placeholder.com/30x30',
  userName: 'Bobbilicous',
};

export default UserHeader;