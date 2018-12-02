import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Navbar from './Navbar';
import Payment from './Payment';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Merhaba {user.name}</p>

            <div style={{ marginBottom: '60px' }} />

            <Payment payment={profile.paymentinfo} />

            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Hesabı Sil
            </button>
            <div style={{ marginBottom: '60px' }} />
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Merhaba {user.name}</p>
            <p>Henüz bir vip üyeliğiniz bulunmuyor!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Vip üyelik al
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="baslikgenel clearfix">
                <h1 className="title">ÜYE BİLGİLERİ</h1>
              </div>
              <div style={{ marginBottom: '60px' }} />
              <div className="columns">
                <Navbar />
                <div className="column">
                  {dashboardContent}
                  <div style={{ marginBottom: '60px' }} />
                  <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                  >
                    Hesabı Sil
                  </button>
                  <div style={{ marginBottom: '60px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
