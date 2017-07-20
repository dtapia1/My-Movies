import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { FormGroup, FormControl, ButtonControl, Button} from 'react-bootstrap';
var NavLink = require('react-router-dom').NavLink;

function Navbar (props) {
  return (
  <nav className="fixed-top navbar navbar-toggleable-md navbar-inverse bg-inverse">
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <a className="navbar-brand" href="#">My Movies</a>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink exact activeClassName='active' to='/' className='nav-link'>Home</NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact activeClassName='active' to='/movies' className='nav-link'>Movies</NavLink>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Search"
      >
      </input>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>)
};

export default Navbar;
