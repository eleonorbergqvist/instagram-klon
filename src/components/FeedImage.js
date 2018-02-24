import React, { Component } from 'react';

class FeedImage extends Component {
  render() {
    return (
      <div>

        <img src={this.props.image} alt="text"/>
        <p>{this.props.description}</p>
        <Like />
        <ViewComments />
      </div>
    );
  }
}

FeedImage.defaultProps = {
  description: 'Stranger',
  image: 'http://via.placeholder.com/1080x1080',
};

class Like extends Component {
  render () {
    return (
        <div>
          <button><i className="far fa-heart"></i></button>
        </div>
      );
  }
}

class ViewComments extends Component {
  render () {
    return (
      <div>
        <p>Comment</p>
        <p>Comment</p>
        <p>Comment</p>
      </div>
    );
  }
}

export default FeedImage;