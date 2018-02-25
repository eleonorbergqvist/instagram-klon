import React, { Component } from 'react';
import './CommentInput.css';

const CommentInput = ({ user }) => {
  return (
    <div className="CommentInput">
      <img className="CommentInput__Avatar" src={user.avatar} />
      <form>
        <label for="CommentInput__Field"></label>
        <input className="CommentInput__Field" id="CommentInput__Field" type="text" name="name" />
        <input className="CommentInput__Submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CommentInput;