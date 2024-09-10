import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Zdravstveni e-Karton</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dijagnoze">Dijagnoze</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/kontakt">Kontakt Doktori</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
