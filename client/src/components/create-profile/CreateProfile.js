import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import Navbar from '../account/Navbar';

class CreateProfile extends Component {
  state = {
    paymenttype: '1', //Havale
    selectedpackage: '1', //1 Ay
    selectedleagues: 'tur', //Türkiye
    selectedexpert: '0', //Yok
    totalprice: 0.0,
    contract: true,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.contract) {
      alert('Üyelik sözleşmesini onaylayınız!');
      return false;
    }

    const profileData = {
      paymenttype: this.state.paymenttype,
      selectedpackage: this.state.selectedpackage,
      selectedleagues: this.state.selectedleagues,
      selectedexpert: this.state.selectedexpert,
      totalprice: this.onChangeTotalprice()
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  onChangeTotalprice = () => {
    return document.getElementsByName('totalprice')[0].value;
  };

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [{ label: 'Havale/EFT', value: '1' }];

    // Select options for package
    const optionsPackage = [
      { label: 'Aylık Üyelik', value: '1' },
      { label: '3 Aylık Üyelik', value: '3' },
      { label: '6 Aylık Üyelik', value: '6' },
      { label: '1 Yıllık Üyelik', value: '12' }
    ];

    // Select options for leagues
    const optionsLeague = [
      { label: 'Turkiye', value: 'tur' },
      { label: 'Ingiltere', value: 'eng' }
    ];

    // Select options for expert
    const optionsExpert = [
      { label: 'İstemiyorum', value: '0' },
      {
        label: this.state.selectedpackage + ' Aylık Uzman Analiz',
        value: this.state.selectedpackage
      }
    ];

    const vipPrices = {
      0: 0,
      1: 40,
      3: 100,
      6: 160,
      12: 320
    };

    const expertPrices = {
      0: 0,
      1: 20,
      3: 50,
      6: 80,
      12: 150
    };

    const totalprice = (
      this.state.totalprice +
      vipPrices[this.state.selectedpackage] +
      expertPrices[this.state.selectedexpert]
    ).toFixed(2);

    const vipTime = (parseInt(this.state.selectedpackage, 10) * 30).toString();

    const dt = new Date();
    const startedDate =
      dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    const setEndedDt = dt.setMonth(
      dt.getMonth() + parseInt(this.state.selectedpackage, 10)
    );
    const endedDt = new Date(setEndedDt);
    const endedDate =
      endedDt.getDate() +
      '/' +
      (endedDt.getMonth() + 1) +
      '/' +
      endedDt.getFullYear();

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="baslikgenel clearfix">
                <h1 className="title">VIP Üyelik Al</h1>
              </div>
              <div style={{ marginBottom: '60px' }} />
              {Object.keys(errors).length > 0 && (
                <div style={{ marginBottom: '60px' }}>
                  {errors.alreadyactive}
                </div>
              )}
              <div className="columns">
                <Navbar />
                <form onSubmit={this.onSubmit}>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <label>Ödeme Tipi</label>
                          <SelectListGroup
                            placeholder="Payment Type"
                            name="paymenttype"
                            value={this.state.paymenttype}
                            onChange={this.onChange}
                            options={options}
                            error={errors.status}
                            info=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Paket Adı</label>
                          <SelectListGroup
                            placeholder="Selected Package"
                            name="selectedpackage"
                            value={this.state.selectedpackage}
                            onChange={this.onChange}
                            options={optionsPackage}
                            error={errors.status}
                            info=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Lig Seçimi</label>
                          <SelectListGroup
                            placeholder="Selected League"
                            name="selectedleagues"
                            value={this.state.selectedleagues}
                            onChange={this.onChange}
                            options={optionsLeague}
                            error={errors.status}
                            info=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Uzman Analiz</label>
                          <SelectListGroup
                            placeholder="Selected Expert"
                            name="selectedexpert"
                            value={this.state.selectedexpert}
                            onChange={this.onChange}
                            options={optionsExpert}
                            error={errors.status}
                            info=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Üyelik Süresi</label>
                          <TextFieldGroup
                            placeholder={vipTime}
                            name="viptime"
                            value={vipTime}
                            disabled="disabled"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Başlama Tarihi</label>
                          <TextFieldGroup
                            placeholder={startedDate}
                            name="startedDate"
                            value={startedDate}
                            disabled="disabled"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Bitiş Tarihi</label>
                          <TextFieldGroup
                            placeholder={endedDate}
                            name="endedDate"
                            value={endedDate}
                            disabled="disabled"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Toplam Tutar</label>
                          <TextFieldGroup
                            placeholder={totalprice}
                            name="totalprice"
                            value={totalprice}
                            onChange={this.onchange}
                            disabled="disabled"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <label htmlFor="contract">
                      <input
                        id="contract"
                        type="checkbox"
                        name="contract"
                        checked={this.state.contract}
                        onChange={this.onChangeCheckbox}
                      />
                      <a data-toggle="modal" data-target="#sozlesmemodal">
                        {' '}
                        Üyelik Sözleşmesini{' '}
                      </a>
                      okudum ve onaylıyorum.
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Bilgileri Onayla"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
