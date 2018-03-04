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
    const { userName } = this.props.match.params;
    const token = window.localStorage.getItem("token");
    
    fetch('http://localhost:8080/api/v1/images?userName='+userName, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          images: json.data
        });
      })
  }

  render() {
    const { userName } = this.props.match.params;
    const { images } = this.state;

    return (
      <div>
        <Header history={this.props.history} />
        <h1>Profile: {userName}</h1>
        {images.map((image) => <FeedImage key={image._id} {...image} />)}
      </div>
    );
  }
}

export default Profile;
