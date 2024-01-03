import React, { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

const NavBar = () => {  
    return (
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">TRABALHOS</Link>
          <Link to="/team">SOBRE NÓS</Link>
          <a href="#footer">CONTACTOS</a>
          <Link to="/search">
            <img src="img/search.png" />
          </Link>
        </div>
      </nav>
    );
};

export default NavBar;