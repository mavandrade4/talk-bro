import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const NavBar = () => {  
    return (
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">
            <img src="img/logo.png" class="navbar-img"/>
          </Link>
          <Link to="/">TRABALHOS</Link>
          <Link to="/team">SOBRE NÓS</Link>
          <a href="#footer">CONTACTOS</a>
          <Link to="/search">
            <img src="img/search.png" class="navbar-search"/>
          </Link>
        </div>
      </nav>
    );
};

export default NavBar;