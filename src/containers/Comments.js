import React, { Component } from 'react';
import data from "./Comments.json";
import Comment from "../components/Comment";
import './Comments.css';
import CommentInput from "../components/CommentInput";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {},
      comments: []
    }
  }

  componentWillMount() {
    this.setState({
      image: data.data.image,
      comments: data.data.comments
    })
  }

  render() {
    const { userName } = this.props.match.params;
    const { image, comments } = this.state;

    return (
      <div className="Comments">
        <h1>Comments: {userName}</h1>
        <Comment avatar={image.user.avatar} userName={image.user.userName} text={image.user.userName} />
        <hr className="Comments__Separator" />
        {comments.map((comment) => <Comment key={comment.id} {...comment} />)}
        <hr className="Comments__Separator" />
        <CommentInput user={image.user} />
      </div>
    );
  }
}

export default Comments;