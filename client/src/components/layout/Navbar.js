import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="navbar-end">
        <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a Gravatar connected to your email to display an image"
          />{' '}
          Çıkış
        </a>
        <Link className="navbar-item " to="/account">
          Hesabım
        </Link>
      </div>
    );

    const guestLinks = (
      <div className="navbar-end">
        <Link className="navbar-item " to="/login">
          Giriş
        </Link>
        <Link className="navbar-item" to="/register">
          Üye Ol
        </Link>
      </div>
    );

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          {isAuthenticated && user.isVip && (
            <Link className="navbar-item" to="/dashboard">
              Analiz Et
            </Link>
          )}
        </div>

        <div id="menu-mobile" className="navbar-menu">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
