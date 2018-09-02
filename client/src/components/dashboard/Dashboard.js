import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStats, clearStats } from '../../actions/statActions';
import classnames from 'classnames';
import Leagues from '../common/Leagues';

class Dashboard extends Component {
  state = {
    homeOMS: '',
    homeAG: '',
    homeYG: '',
    awayOMS: '',
    awayAG: '',
    awayYG: '',
    leagueOMS: '',
    leagueHomeAG: '',
    leagueAwayAG: '',
    errors: {},
    defaultSelectValueHome: '0',
    defaultSelectValueAway: '1'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.schedule) {
      const leagueOMS =
        (parseInt(nextProps.schedule[0]['TO'], 10) *
          nextProps.schedule.length) /
        2;

      const leagueHomeAG = nextProps.schedule.reduce(function(acc, val) {
        return parseInt(acc, 10) + parseInt(val.IA, 10);
      }, 0);

      const leagueAwayAG = nextProps.schedule.reduce(function(acc, val) {
        return parseInt(acc, 10) + parseInt(val.DA, 10);
      }, 0);

      this.setState({
        leagueOMS: leagueOMS.toString(),
        leagueHomeAG: leagueHomeAG.toString(),
        leagueAwayAG: leagueAwayAG.toString(),
        homeOMS: nextProps.schedule[this.state.defaultSelectValueHome].TO,
        homeAG: nextProps.schedule[this.state.defaultSelectValueHome].TA,
        homeYG: nextProps.schedule[this.state.defaultSelectValueHome].TY,
        awayOMS: nextProps.schedule[this.state.defaultSelectValueAway].TO,
        awayAG: nextProps.schedule[this.state.defaultSelectValueAway].TA,
        awayYG: nextProps.schedule[this.state.defaultSelectValueAway].TY
      });

      // const homeAG = nextProps.schedule[0].TA;
      // const homeYG = nextProps.schedule[0].TY;
      // const homeOMS = nextProps.schedule[0].TO;

      // const awayAG = nextProps.schedule[1].TA;
      // const awayYG = nextProps.schedule[1].TY;
      // const awayOMS = nextProps.schedule[1].TO;

      // this.setState({
      //   leagueOMS: leagueOMS.toString(),
      //   leagueHomeAG: leagueHomeAG.toString(),
      //   leagueAwayAG: leagueAwayAG.toString(),
      //   homeOMS: homeOMS,
      //   homeAG: homeAG,
      //   homeYG: homeYG,
      //   awayOMS: awayOMS,
      //   awayAG: awayAG,
      //   awayYG: awayYG,
      //   defaultSelectValueAway: '1',
      //   defaultSelectValueHome: '0'
      // });
    }
  }

  static propTypes = {
    getStats: PropTypes.func.isRequired,
    clearStats: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onSelectChangeHome = e => {
    this.setState({
      defaultSelectValueHome: e.target.value,
      homeAG: e.currentTarget.selectedOptions[0].attributes['homeag'].value,
      homeYG: e.currentTarget.selectedOptions[0].attributes['homeyg'].value
    });
  };

  onSelectChangeAway = e => {
    this.setState({
      defaultSelectValueAway: e.target.value,
      awayAG: e.currentTarget.selectedOptions[0].attributes['awayag'].value,
      awayYG: e.currentTarget.selectedOptions[0].attributes['awayyg'].value
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = this.state;

    this.props.getStats(data);
  };

  render() {
    const {
      errors,
      defaultSelectValueAway,
      defaultSelectValueHome
    } = this.state;
    const { stats } = this.props.stats;
    const schedule = this.props.schedule;

    return (
      <div className="box">
        <div className="columns">
          <div className="column is-mobile">
            <form className="form signin" onSubmit={this.onSubmit}>
              <div className="columns">
                <div className="column is-mobile">
                  <div className="box">
                    <p className="title is-4 is-spaced has-text-centered">
                      Lig Ortalaması
                    </p>
                    <div className="field">
                      <div className="control">
                        <Leagues />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Oynanan Maç Sayısı</label>
                      <div className="control">
                        <input
                          type="text"
                          name="leagueOMS"
                          className={classnames('input', {
                            'is-danger': errors.leagueOMS
                          })}
                          value={this.state.leagueOMS}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.leagueOMS && (
                        <p className="help is-danger">{errors.leagueOMS}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Ev Sahibi Gol</label>
                      <div className="control">
                        <input
                          type="test"
                          name="leagueHomeAG"
                          className={classnames('input', {
                            'is-danger': errors.leagueHomeAG
                          })}
                          value={this.state.leagueHomeAG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.leagueHomeAG && (
                        <p className="help is-danger">{errors.leagueHomeAG}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Misafir Gol</label>
                      <div className="control">
                        <input
                          type="text"
                          name="leagueAwayAG"
                          className={classnames('input', {
                            'is-danger': errors.leagueAwayAG
                          })}
                          value={this.state.leagueAwayAG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.leagueAwayAG && (
                        <p className="help is-danger">{errors.leagueAwayAG}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="column is-mobile">
                  <div className="box">
                    <p className="title is-4 is-spaced has-text-centered">
                      Ev Sahibi Takım
                    </p>
                    <div className="field">
                      <div className="control">
                        <select
                          value={defaultSelectValueHome}
                          onChange={this.onSelectChangeHome}
                        >
                          {Object.keys(schedule).length > 0 &&
                            schedule.map((item, key) => {
                              return (
                                <option
                                  homeag={item.TA}
                                  homeyg={item.TY}
                                  key={key}
                                  value={key}
                                >
                                  {item.Team}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Oynadığı Maç Sayısı</label>
                      <div className="control">
                        <input
                          type="text"
                          name="homeOMS"
                          className={classnames('input', {
                            'is-danger': errors.homeOMS
                          })}
                          value={this.state.homeOMS}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.homeOMS && (
                        <p className="help is-danger">{errors.homeOMS}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Attığı Gol</label>
                      <div className="control">
                        <input
                          type="test"
                          name="homeAG"
                          className={classnames('input', {
                            'is-danger': errors.homeAG
                          })}
                          value={this.state.homeAG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.homeAG && (
                        <p className="help is-danger">{errors.homeAG}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Yediği Gol</label>
                      <div className="control">
                        <input
                          type="text"
                          name="homeYG"
                          className={classnames('input', {
                            'is-danger': errors.homeYG
                          })}
                          value={this.state.homeYG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.homeYG && (
                        <p className="help is-danger">{errors.homeYG}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="column is-mobile">
                  <div className="box">
                    <p className="title is-4 is-spaced has-text-centered">
                      Konuk Takım
                    </p>
                    <div className="field">
                      <div className="control">
                        <select
                          value={defaultSelectValueAway}
                          onChange={this.onSelectChangeAway}
                        >
                          {Object.keys(schedule).length > 0 &&
                            schedule.map((item, key) => {
                              return (
                                <option
                                  awayag={item.TA}
                                  awayyg={item.TY}
                                  key={key}
                                  value={key}
                                >
                                  {item.Team}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Oynadığı Maç Sayısı</label>
                      <div className="control">
                        <input
                          type="text"
                          name="awayOMS"
                          className={classnames('input', {
                            'is-danger': errors.awayOMS
                          })}
                          value={this.state.awayOMS}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.awayOMS && (
                        <p className="help is-danger">{errors.awayOMS}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Attığı Gol</label>
                      <div className="control">
                        <input
                          type="test"
                          name="awayAG"
                          className={classnames('input', {
                            'is-danger': errors.awayAG
                          })}
                          value={this.state.awayAG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.awayAG && (
                        <p className="help is-danger">{errors.awayAG}</p>
                      )}
                    </div>

                    <div className="field">
                      <label className="label">Yediği Gol</label>
                      <div className="control">
                        <input
                          type="text"
                          name="awayYG"
                          className={classnames('input', {
                            'is-danger': errors.awayYG
                          })}
                          value={this.state.awayYG}
                          onChange={this.onChange}
                        />
                      </div>
                      {errors.awayYG && (
                        <p className="help is-danger">{errors.awayYG}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-link">Hesapla</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {Object.keys(stats).length > 0 && (
          <Fragment>
            <div className="columns">
              <div className="column is-mobile">
                <div className="box">
                  <p className="title is-4 is-spaced has-text-centered">
                    Ev Sahibi Takım Ortalaması
                  </p>
                  <div className="field">
                    <label className="label">
                      Attığı Gol <br /> {stats.home.averageAG}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Yediği Gol <br /> {stats.home.averageYG}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Hücüm <br /> {stats.home.attackPower}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Savunma <br /> {stats.home.defensePower}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Gol Ortalamsı <br /> {stats.home.reCalculateAGaverage}
                    </label>
                  </div>
                </div>
              </div>
              <div className="column is-mobile">
                <div className="box">
                  <p className="title is-4 is-spaced has-text-centered">
                    Misafir Takım Ortalaması
                  </p>
                  <div className="field">
                    <label className="label">
                      Attığı Gol <br /> {stats.away.averageAG}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Yediği Gol <br /> {stats.away.averageYG}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Hücüm <br /> {stats.away.attackPower}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Savunma <br /> {stats.away.defensePower}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Gol Ortalamsı <br /> {stats.away.reCalculateAGaverage}
                    </label>
                  </div>
                </div>
              </div>
              <div className="column is-mobile">
                <div className="box">
                  <p className="title is-4 is-spaced has-text-centered">
                    Lig Ortalaması
                  </p>
                  <div className="field">
                    <label className="label">
                      Ev Sahibi Atılan Gol <br /> {stats.league.homeAGaverage}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Ev Sahibi Yenilen Gol <br /> {stats.league.homeYGaverage}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Misafir Atılan Gol <br /> {stats.league.awayAGaverage}
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Misafir Yenilen Gol <br /> {stats.league.awayYGaverage}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-mobile">
                <div className="box">
                  <p className="title is-4 is-spaced has-text-centered">
                    Skor Olasılıkları
                  </p>
                  <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>0-0</th>
                        <th>1-0</th>
                        <th>2-0</th>
                        <th>0-1</th>
                        <th>0-2</th>
                        <th>1-1</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{stats.scores.zeroTozero}</td>
                        <td>{stats.scores.oneToZero}</td>
                        <td>{stats.scores.twoToZero}</td>
                        <td>{stats.scores.zeroToOne}</td>
                        <td>{stats.scores.zeroToTwo}</td>
                        <td>{stats.scores.oneToOne}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-mobile">
                <div className="box">
                  <p className="title is-4 is-spaced has-text-centered">
                    Diğer Olasılıklar
                  </p>
                  <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>Alt Oranı</th>
                        <th>Üst Oranı</th>
                        <th>Alt Bitme Olasılığı</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{stats.underBet}</td>
                        <td>{stats.overBet}</td>
                        <td>{stats.under}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.stats,
  schedule: state.schedule,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getStats, clearStats }
)(Dashboard);
