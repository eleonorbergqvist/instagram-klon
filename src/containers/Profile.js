import React, { Component } from 'react';
// import data from "./FeedImages.json";
import Header from '../components/Header';
import FeedImage from '../components/FeedImage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }
 
  componentWillMount() {
    const currentUserId = window.localStorage.getItem("currentUserId");
    this.setState({
      currentUserId: currentUserId,
    });

    const { userName } = this.props.match.params;
    const token = window.localStorage.getItem("token");
    
    fetch('http://localhost:8080/api/v1/images?userName='+userName, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          return Promise.reject(response);
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          images: json.data
        });
      })
      .catch(error => {
        alert(error.statusText);
      });
  }

  render() {
    const { userName } = this.props.match.params;
    const { images, currentUserId } = this.state;

    return (
      <div>
        <Header showBack history={this.props.history} />
        <h1>Profile: {userName}</h1>
        {images.map((image) => <FeedImage key={image._id} {...image} currentUserId={currentUserId} />)}
      </div>
    );
  }
}

export default Profile;
