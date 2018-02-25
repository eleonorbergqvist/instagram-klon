import React, { Component } from 'react';
import UserHeader from './UserHeader';
import './FeedImage.css';

class FeedImage extends Component {
  render() {
    return (
      <article className="FeedImage">
        <UserHeader {...this.props.user} />
        <img className="FeedImage__Image" src={this.props.image} alt="text"/>
        <Toolbar likes={this.props.likes} />
        <p className="FeedImage__Description">
          <strong class="FeedImage__DescriptionUserName">{this.props.user1.userName}</strong>
          {this.props.description}
        </p>
        {this.props.commentCount > 0 && 
          <a className="FeedImage__ShowComments" href="#">Visa kommentarer</a>
        }
      </article>
    );
  }
}

FeedImage.defaultProps = {
  description: 'Stranger',
  image: 'http://via.placeholder.com/1080x1080',
  user1: {
    avatar: 'http://via.placeholder.com/30x30',
    userName: 'Bobbilicious1'
  },
  likes: 4,
  commentCount: 7 
};

class Toolbar extends Component {
  render () {
    return (
      <div className="Toolbar">
        <div className="Toolbar__Wrapper">
          <button className="Toolbar__LikeBtn"><i className="far fa-heart"></i></button>
        </div>
        {this.props.likes > 0 && 
        <p className="Toolbar__Likes">{this.props.likes} gilla-markeringar</p>
      }
      </div>
    );
  }
}

export default FeedImage;