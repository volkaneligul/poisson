const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateStatsInput(data) {
  const requiredMsg = 'Bu alanın doldurulması zorunludur!';
  let errors = {};

  /**
   * OMS: oynanan mac sayisi
   * AG: atilan gol
   * YG: yenilen gol
   */

  //HOME STATS
  data.homeOMS = !isEmpty(data.homeOMS) ? data.homeOMS : '';
  data.homeAG = !isEmpty(data.homeAG) ? data.homeAG : '';
  data.homeYG = !isEmpty(data.homeYG) ? data.homeYG : '';

  //AWAY STATS
  data.awayOMS = !isEmpty(data.awayOMS) ? data.awayOMS : '';
  data.awayAG = !isEmpty(data.awayAG) ? data.awayAG : '';
  data.awayYG = !isEmpty(data.awayYG) ? data.awayYG : '';

  //LEAGUE AVERAGE STATS
  data.leagueOMS = !isEmpty(data.leagueOMS) ? data.leagueOMS : '';
  data.leagueHomeAG = !isEmpty(data.leagueHomeAG) ? data.leagueHomeAG : '';
  data.leagueAwayAG = !isEmpty(data.leagueAwayAG) ? data.leagueAwayAG : '';

  // HOME STATS VALIDATE
  if (Validator.isEmpty(data.homeOMS)) {
    errors.homeOMS = requiredMsg;
  }

  if (Validator.isEmpty(data.homeAG)) {
    errors.homeAG = requiredMsg;
  }

  if (Validator.isEmpty(data.homeYG)) {
    errors.homeYG = requiredMsg;
  }

  // AWAY STATS VALIDATE
  if (Validator.isEmpty(data.awayOMS)) {
    errors.awayOMS = requiredMsg;
  }

  if (Validator.isEmpty(data.awayAG)) {
    errors.awayAG = requiredMsg;
  }

  if (Validator.isEmpty(data.awayYG)) {
    errors.awayYG = requiredMsg;
  }

  // LEAGUE AVARAGE STATS VALIDATE
  if (Validator.isEmpty(data.leagueOMS)) {
    errors.leagueOMS = requiredMsg;
  }

  if (Validator.isEmpty(data.leagueHomeAG)) {
    errors.leagueHomeAG = requiredMsg;
  }

  if (Validator.isEmpty(data.leagueAwayAG)) {
    errors.leagueAwayAG = requiredMsg;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
