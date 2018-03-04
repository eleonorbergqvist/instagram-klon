import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Comments from './containers/Comments';
import FeedImages from './containers/FeedImages';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Register from './containers/Register';
import ImageDetail from './containers/ImageDetail';


const Routes = (props) => {
  return(
    <div>
      <Route path='/images/:imgId/comments' component={Comments} />
      <Route exact path='/images/:imgId/' component={ImageDetail} />
      <Route path='/feeds/' component={FeedImages} />
      <Route path='/users/:userName' component={Profile} />
      <Route exact path='/' component={Bobby} />
      <Route path='/login/' component={Login} />
      <Route path='/register/' component={Register} />
    </div>
  );
};

class Bobby extends Component {
  render() {
    return (
      <div>Bobbsibobbsibobb!!</div>
    );
  }
}

export default Routes;