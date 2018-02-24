import React, { Component } from 'react';

class Profile extends Component {
  render() {
    const { userName } = this.props.match.params

    return (
      <div>
        <h1>Profile: {userName}</h1>
      </div>
    );
  }
}

export default Profile;