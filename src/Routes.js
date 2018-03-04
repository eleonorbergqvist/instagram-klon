import React from 'react';
import { Route } from 'react-router-dom';
import Comments from './containers/Comments';
import FeedImages from './containers/FeedImages';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Register from './containers/Register';
import ImageDetail from './containers/ImageDetail';
import { Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      window.localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = (props) => {
  return(
    <div>
      <PrivateRoute path='/images/:imgId/comments' component={Comments} />
      <PrivateRoute exact path='/images/:imgId/' component={ImageDetail} />
      <PrivateRoute path='/feeds/' component={FeedImages} />
      <PrivateRoute path='/users/:userName' component={Profile} />
      <PrivateRoute exact path='/' component={FeedImages} />
      <Route path='/login/' component={Login} />
      <Route path='/register/' component={Register} />
    </div>
  );
};

export default Routes;