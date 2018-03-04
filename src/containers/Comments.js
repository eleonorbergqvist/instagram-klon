import React, { Component } from 'react';
// import data from "./Comments.json";
import './Comments.css';
import Comment from "../components/Comment";
import Header from '../components/Header';
import CommentInput from "../components/CommentInput";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      comments: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:8080/api/v1/comments')
      .then(response => response.json())
      .then(json => {
        this.setState({
          image: json.data.image,
          comments: json.data.comments,
        });
      })
  }

  render() {
    const { userName } = this.props.match.params;
    const { image, comments } = this.state;

    return (
      <div className="Comments">
        <Header showBack history={this.props.history} />
        <h1>------------------</h1>
        <h1>Comments: {userName}</h1>
        {image && 
          <Comment avatar={image.user.avatar} userName={image.user.userName} text={image.user.userName} />
        }
        <hr className="Comments__Separator" />
        {comments.map((comment) => <Comment key={comment._id} {...comment} />)}
        <hr className="Comments__Separator" />
        {image && 
          <CommentInput user={image.user} />
        }
      </div>
    );
  }
}

export default Comments;