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
          Logout
        </a>
        <Link className="navbar-item " to="/account">
          Account
        </Link>
      </div>
    );

    const guestLinks = (
      <div className="navbar-end">
        <Link className="navbar-item " to="/login">
          Login
        </Link>
        <Link className="navbar-item" to="/register">
          Sign Up
        </Link>
      </div>
    );

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="index.html">
            <span className="logo">Bring</span>
            <span className="up">Up</span>
          </a>

          <div className="navbar-burger burger" data-target="menu-mobile">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="menu-mobile" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="index.html">
              Home
            </a>
            <a className="navbar-item" href="product.html">
              Product
            </a>
            <a className="navbar-item" href="about.html">
              About
            </a>
            <a className="navbar-item " href="career.html">
              Career
            </a>
          </div>

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
