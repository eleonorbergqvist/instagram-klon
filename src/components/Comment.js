import React from 'react';
import './Comment.css';

const Comment = ({avatar, userName, text}) => {
  return (
    <p className="Comment">
        <img className="Comment__Avatar" alt={userName} src={avatar} />
        <strong className="Comment__UserName">{userName}</strong> 
        {text} 
        <button className="Comment__LikeBtn">
        <i className="far fa-heart"></i>
        </button>
    </p>
  )
}

export default Comment;