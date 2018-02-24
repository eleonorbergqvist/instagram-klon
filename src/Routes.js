import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';


const Routes = (props) => {
  return(
    <div>
      <Route path='/bobby' component={Bobby} />
      <Route path='/dum' component={Bobby} />
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