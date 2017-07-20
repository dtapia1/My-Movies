import React, { Component } from 'react';
import ReactDOM from "react-dom";
import * as ReactBootstrap from 'react-bootstrap';
import './App.css';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Movies from './Movies.js'
import Details from './Details.js'
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;




class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/movies' component={Movies} />
            <Route exact path='/details' component={Details} />

            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
