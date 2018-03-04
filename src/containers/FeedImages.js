import React, { Component } from 'react';
import data from "./FeedImages.json";
import Header from '../components/Header';
import FeedImage from '../components/FeedImage';

class FeedImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }
 
  componentWillMount() {
    fetch('http://localhost:8080/api/v1/images')
      .then(response => response.json())
      .then(json => {
        this.setState({
          images: json.data
        });
      })
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <Header history={this.props.history} />
        <h1>Feed</h1>
        {images.map((image) => <FeedImage key={image.id} {...image} />)}
      </div>
    );
  }
}

export default FeedImages;
