import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <nav className="custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">Inicio</Link>
          <div className="nav-links">
            <Link className="nav-link" to="/nosotros">Nosotros</Link>
            <Link className="nav-link" to="/registrarse">Registro</Link>
            <Link className="nav-link" to="/iniciarsesion">Login</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
