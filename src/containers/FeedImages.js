import React, { Component } from 'react';

class FeedImages extends Component {
  render() {
    const { userName } = this.props.match.params
    return (
      <div>
        <h1>FeedImages: {userName}</h1>
      </div>
    );
  }
}

export default FeedImages;
