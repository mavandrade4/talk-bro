import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const NavBar = () => {  
    return (
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/talk-bro/">
            <img src="/img/logo.svg" class="navbar-img"/>
          </Link>
          <Link to="/talk-bro/">TRABALHOS</Link>
          <Link to="/talk-bro/team">SOBRE NÓS</Link>
          <a href="#footer">CONTACTOS</a>
          <Link to="/talk-bro/search">
            <img src="/img/search.png" class="navbar-search"/>
          </Link>
        </div>
      </nav>
    );
};

export default NavBar;