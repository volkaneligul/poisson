import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchedule } from '../../actions/scheduleActions';

class Leagues extends Component {
  static propTypes = {
    getSchedule: PropTypes.func.isRequired
  };

  state = {
    defaultSelectValueLeague: 'TUR'
  };

  componentDidMount() {
    this.getLeagueData(this.state.defaultSelectValueLeague);
  }

  onSelectChangeLeague = e => {
    this.setState({ defaultSelectValueLeague: e.target.value });
    this.getLeagueData(e.target.value);
  };

  getLeagueData = country => {
    this.props.getSchedule({
      country: country,
      isSaveMongo: true
    });
  };

  render() {
    const leagues = [
      {
        name: 'Türkiye',
        shortName: 'TUR'
      },
      {
        name: 'İngiltere',
        shortName: 'ENG'
      }
    ];

    return (
      <select
        value={this.state.defaultSelectValueLeague}
        onChange={this.onSelectChangeLeague}
      >
        {Object.keys(leagues).length > 0 &&
          leagues.map((league, key) => {
            return (
              <option key={key} value={league.shortName}>
                {league.name}
              </option>
            );
          })}
      </select>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule
});

export default connect(
  mapStateToProps,
  { getSchedule }
)(Leagues);
