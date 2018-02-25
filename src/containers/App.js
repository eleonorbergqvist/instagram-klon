import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes';
import './App.css';
import Header from '../components/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
