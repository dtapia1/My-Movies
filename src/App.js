import React from 'react';
import './App.css';
import Movies from './components/Movies.js'
import Navbar from './components/Navbar.js'
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
