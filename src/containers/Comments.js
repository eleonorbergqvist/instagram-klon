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
      comments: [],
      currentUser: null,
    }
  }

  componentWillMount() {
    const {imgId} = this.props.match.params;
    const token = window.localStorage.getItem("token");

    fetch('http://localhost:8080/api/v1/comments?image='+imgId, {
        method: 'GET',
        headers: {
          'x-access-token': token
        }})
      .then(response => response.json())
      .then(json => {
        this.setState({
          comments: json.data,
        });
      })

    fetch('http://localhost:8080/api/v1/images/'+imgId, {
        method: 'GET',
        headers: {
          'x-access-token': token
        }})
      .then(response => response.json())
      .then(json => {
        this.setState({
          image: json.data,
        });
      })

    const currentUser = window.localStorage.getItem("currentUser");
    this.setState({
      currentUser,
    });
  }

  render() {
    const { userName } = this.props.match.params;
    const { image, comments, currentUser } = this.state;

    return (
      <div className="Comments">
        <Header showBack history={this.props.history} />

        {image && 
          <Comment user={image.user} text={image.description} />
        }
        <hr className="Comments__Separator" />
        {comments.map((comment) => <Comment key={comment._id} {...comment} />)}
        <hr className="Comments__Separator" />
        {image && currentUser && 
          <CommentInput image={image._id} user={currentUser} />
        }
      </div>
    );
  }
}

export default Comments;