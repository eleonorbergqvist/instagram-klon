import React, { Component } from 'react';
import UserHeader from './UserHeader';
import './FeedImage.css';
import { Link } from "react-router-dom";

class FeedImage extends Component {
  render() {
    const { _id, user, likes, source, description, commentCount } = this.props;

    return (
      <article className="FeedImage">
        <UserHeader {...user} />
        <img className="FeedImage__Image" src={ "http://localhost:8080/public/" + source } alt="text"/>
        <Toolbar likes={likes} imageId={_id} />
        <p className="FeedImage__Description">
          <strong className="FeedImage__DescriptionUserName">{user.userName}</strong>
          {description}
        </p>
        
        {commentCount > 0 && 
          <Link className="FeedImage__ShowComments" to={`/images/${_id}/comments`}>Visa kommentarer</Link>
        }
      </article>
    );
  }
}

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: this.props.likes,
    };
  }

  handleClick = (event) => {
    const { imageId } = this.props;
    const token = window.localStorage.getItem("token");

    fetch('http://localhost:8080/api/v1/images/'+imageId+'/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          likes: json.data.likes,
        })
      })
    }

  render () {
    return (
      <div className="Toolbar">
        <div className="Toolbar__Wrapper">
          <button className="Toolbar__LikeBtn" onClick={this.handleClick}><i className="far fa-heart"></i></button>
        </div>
        {this.state.likes.length > 0 && 
          <p className="Toolbar__Likes">{this.state.likes.length} gilla-markeringar</p>
        }
      </div>
    );
  }
}

export default FeedImage;