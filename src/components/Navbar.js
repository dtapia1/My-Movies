import React from 'react';
var NavLink = require('react-router-dom').NavLink;

function Navbar (props) {
  return (
    <nav className="fixed-top navbar navbar-toggleable-md navbar-inverse bg-inverse">
      <div className='nav-container container'>
        <NavLink exact activeClassName='navbar-brand active' to='/'>My Movies</NavLink>
      </div>
    </nav>
)};

export default Navbar;
