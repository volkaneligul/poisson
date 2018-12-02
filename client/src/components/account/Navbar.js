import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="column is-one-fifth">
      <ul className="nav nav-stacked">
        <li>
          <Link className="navbar-item" to="/account">
            Bilgilerim
          </Link>
        </li>
        <li>
          <Link className="navbar-item" to="/create-profile">
            Paket Satın Al
          </Link>
        </li>
      </ul>
    </div>
  );
};
