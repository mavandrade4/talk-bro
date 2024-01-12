import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const NavBar = () => {  

  
    return (
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/talk-bro/">
            <img src="img/logo.svg" class="navbar-img"/>
          </Link>
          <Link to="/talk-bro/#image-grid">TRABALHOS</Link>
          <Link to="/talk-bro/team">SOBRE NÓS</Link>
          <Link to="/talk-bro/search">PESQUISA</Link>
          <a href="#footer">CONTACTOS</a>
        </div>
      </nav>
    );
};

export default NavBar;