import React from 'react';
import './App.css';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import Movies from './components/Movies.js'
import Details from './components/Details.js'
import Test from './components/Test.js'
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Movies} />
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
