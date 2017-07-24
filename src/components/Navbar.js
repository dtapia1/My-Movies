import React from 'react';
var NavLink = require('react-router-dom').NavLink;

function Navbar (props) {
  return (
    <nav className="fixed-top navbar navbar-toggleable-md navbar-inverse bg-inverse">
      <NavLink exact activeClassName='navbar-brand active' to='/'>My Movies</NavLink>
    </nav>
)};

export default Navbar;
