import React, { Component } from 'react';
import data from "./FeedImages.json";
import FeedImage from '../components/FeedImage';

class FeedImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }

  componentWillMount() {
    this.setState({
      images: data.data
    })
  }

  render() {
    const { userName } = this.props.match.params;
    const { images } = this.state;

    return (
      <div>
        <h1>FeedImages: {userName}</h1>
        {images.map((image) => <FeedImage key={image.id} {...image} />)}
      </div>
    );
  }
}

export default FeedImages;
