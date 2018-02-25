import React, { Component } from 'react';
import UserHeader from './UserHeader';
import './FeedImage.css';

class FeedImage extends Component {
  render() {
    return (
      <article className="FeedImage">
        <UserHeader {...this.props.user} />
        <img className="FeedImage__Image" src={this.props.image} alt="text"/>
        <p>{this.props.description}</p>
        <Toolbar />
        <ViewComments />
      </article>
    );
  }
}

FeedImage.defaultProps = {
  description: 'Stranger',
  image: 'http://via.placeholder.com/1080x1080',
  user1: {
    avatar: 'http://via.placeholder.com/30x30',
    userName: 'Bobbilicous1'
  }
};

class Toolbar extends Component {
  render () {
    return (
      <div>
        <button><i className="far fa-heart"></i></button>
      </div>
    );
  }
}

class ViewComments extends Component {
  render () {
    return (
      <div>
        <p>Comment</p>
        <p>Comment</p>
        <p>Comment</p>
      </div>
    );
  }
}

export default FeedImage;