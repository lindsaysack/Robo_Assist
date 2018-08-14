import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">HOME</Link>
          <Link className="navbar-brand" to="/bots">BOTS </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
