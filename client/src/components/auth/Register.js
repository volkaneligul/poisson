import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="box">
        <form className="form signup" onSubmit={this.onSubmit}>
          <p className="title is-1 is-spaced has-text-centered">Register</p>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                name="name"
                className={classnames('input', {
                  'is-danger': errors.name
                })}
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            {errors.name && <p className="help is-danger">{errors.name}</p>}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                name="email"
                className={classnames('input', {
                  'is-danger': errors.email
                })}
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                name="password"
                className={classnames('input', {
                  'is-danger': errors.password
                })}
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            {errors.password && (
              <p className="help is-danger">{errors.password}</p>
            )}
          </div>

          <div className="field">
            <label className="label">Password Repeat</label>
            <div className="control">
              <input
                type="password"
                name="password2"
                className={classnames('input', {
                  'is-danger': errors.password2
                })}
                value={this.state.password2}
                onChange={this.onChange}
              />
            </div>
            {errors.password2 && (
              <p className="help is-danger">{errors.password2}</p>
            )}
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
