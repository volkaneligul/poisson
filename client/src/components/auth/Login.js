import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="box">
        <form className="form signin" onSubmit={this.onSubmit}>
          <p className="title is-1 is-spaced has-text-centered">Login</p>
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
  { loginUser }
)(Login);
