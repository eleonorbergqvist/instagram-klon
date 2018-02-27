import React from 'react';
import './CommentInput.css';

const CommentInput = ({ user }) => {
  return (
    <div className="CommentInput">
      <img className="CommentInput__Avatar" alt={user.avatar} src={user.avatar} />
      <form>
        <label htmlFor="CommentInput__Field"></label>
        <input className="CommentInput__Field" id="CommentInput__Field" type="text" name="name" />
        <input className="CommentInput__Submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CommentInput;