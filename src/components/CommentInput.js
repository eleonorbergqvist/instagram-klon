import React, { Component } from 'react';
import './CommentInput.css';

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });

    console.log(this.state.text);
  }

  urlencodeObject = params => {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      text: '',
    })

    const body = this.urlencodeObject({
      text: this.state.text,
      image: this.props.image,
    });
    
    fetch('http://localhost:8080/api/v1/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': this.props.token,
      },
      body: body,
    })
      .then(response => response.json())
      .then(json => {
        this.props.onSuccess(json.comment);
      })
  }

  render() {
    const { user } = this.props;

    return (
      <div className="CommentInput">
        <img className="CommentInput__Avatar" alt={user.avatar} src={ "http://localhost:8080/public/" + user.avatar } />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="CommentInput__Field"></label>
          <input className="CommentInput__Field" id="CommentInput__Field" 
            type="text" onChange={this.handleChange} name="text" 
            value={this.state.text}
            />
          <input className="CommentInput__Submit" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CommentInput;