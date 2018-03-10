import React, { Component } from 'react';
import { Redirect } from 'react-router'
//import data from "./FeedImages.json";
import Header from '../components/Header';
import FeedImage from '../components/FeedImage';

class FeedImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loggedOut: false,
    }
  }
 
  componentWillMount() {
    const currentUserId = window.localStorage.getItem("currentUserId");
    this.setState({
      currentUserId: currentUserId,
    });

    const token = window.localStorage.getItem("token");
    fetch('http://localhost:8080/api/v1/images', {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
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
        this.setState({
          loggedOut: true,
        })
      });
  }

  render() {
    const { images, currentUserId } = this.state;

    if (this.state.loggedOut) {
      return <Redirect to={'/login/'} />;
    }

    return (
      <div>
        <Header history={this.props.history} />
        <h1>Feed</h1>
        {images.map((image) => <FeedImage key={image._id} {...image} currentUserId={currentUserId} />)}
      </div>
    );
  }
}

export default FeedImages;
