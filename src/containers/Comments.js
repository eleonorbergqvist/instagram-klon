import React, { Component } from 'react';
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
      currentUserName: null,
      currentUserAvatar: null,
    }
  }

  componentWillMount() {
    const { imgId } = this.props.match.params;
    const currentUserName = window.localStorage.getItem("currentUserName");
    const currentUserAvatar = window.localStorage.getItem("currentUserAvatar");
    const token = window.localStorage.getItem("token");

    this.setState({
      token: token,
      user: {
        userName: currentUserName,
        avatar: currentUserAvatar,
      },
    });

    this.getComments();

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

      
  }

  getComments() {
    const {imgId} = this.props.match.params;
    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8080/api/v1/comments?image='+imgId, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        }})
      .then(response => response.json())
      .then(json => {
        this.setState({
          comments: json.data,
        });
      })
  }

  handleCommentSuccess = (comment) => {
    this.getComments();
  }

  render() {
    const { image, comments, user, token } = this.state;

    return (
      <div className="Comments">
        <Header showBack history={this.props.history} />

        {image && 
          <Comment user={image.user} text={image.description} />
        }
        <hr className="Comments__Separator" />
        {comments.map((comment) => <Comment key={comment._id} {...comment} />)}
        <hr className="Comments__Separator" />

        {image && user &&
          <CommentInput image={image._id} user={user} onSuccess={this.handleCommentSuccess} token={token} />
        }
      </div>
    );
  }
}

export default Comments;