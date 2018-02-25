import React, { Component } from 'react';
import UserHeader from './UserHeader';
import './FeedImage.css';
import { Link } from "react-router-dom";

class FeedImage extends Component {
  render() {
    const { id, user, likes, image, description, commentCount } = this.props;

    return (
      <article className="FeedImage">
        <UserHeader {...user} />
        <img className="FeedImage__Image" src={image} alt="text"/>
        <Toolbar likes={likes} />
        <p className="FeedImage__Description">
          <strong class="FeedImage__DescriptionUserName">{user.userName}</strong>
          {description}
        </p>
        
        {commentCount > 0 && 
          <Link className="FeedImage__ShowComments" to={`/images/${id}/comments`}>Visa kommentarer</Link>
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