import React from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';

const Comment = ({user, text}) => {
  return (
    <p className="Comment">
        <img className="Comment__Avatar" alt={user.userName} src={ "http://localhost:8080/public/" + user.avatar } />
        <Link className="Comment__UserName" to={`/users/${user.userName}`}>{user.userName}</Link>
      {text} 
    </p>
  )
}

export default Comment;