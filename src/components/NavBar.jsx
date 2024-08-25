import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './navbar.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar neon-nav navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand neon-text" to="/">Home</Link>
        <button className="navbar-toggler neon-btn" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link neon-text" to="/my-profile">Mi Perfil</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link neon-text neon-btn" onClick={logout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link neon-text" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
