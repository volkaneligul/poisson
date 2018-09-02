const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateStatsInput = require('../../validation/stats');

router.get('/test', (req, res) => res.json({ msg: 'Stats Works' }));

// @route   GET api/stats/
// @desc    Tests stats route
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStatsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const fact = x => {
      if (x == 0) {
        return 1;
      }
      return x * fact(x - 1);
    };

    /**
     * @param {The number of events.} k
     * @param {The expected numeric value.} landa
     */
    const poisson = (k, landa) => {
      const exponential = 2.718281828;
      let numerator, denominator;

      exponentialPower = Math.pow(exponential, -landa); // negative power k
      landaPowerK = Math.pow(landa, k); // Landa elevated k
      numerator = exponentialPower * landaPowerK;
      denominator = fact(k); // factorial of k.

      return (numerator / denominator).toFixed(3);
    };

    // Get fields
    let statsFields = {},
      home = {},
      league = {},
      away = {},
      scores = {},
      sum = 0;

    statsFields.user = req.user.id;

    // GET HOME STATS
    if (req.body.homeOMS) statsFields.homeOMS = parseInt(req.body.homeOMS);
    if (req.body.homeAG) statsFields.homeAG = parseInt(req.body.homeAG);
    if (req.body.homeYG) statsFields.homeYG = parseInt(req.body.homeYG);

    // GET AWAY STATS
    if (req.body.awayOMS) statsFields.awayOMS = parseInt(req.body.awayOMS);
    if (req.body.awayAG) statsFields.awayAG = parseInt(req.body.awayAG);
    if (req.body.awayYG) statsFields.awayYG = parseInt(req.body.awayYG);

    // GET LEAGUE AVERAGE STATS
    if (req.body.leagueOMS)
      statsFields.leagueOMS = parseInt(req.body.leagueOMS);
    if (req.body.leagueHomeAG)
      statsFields.leagueHomeAG = parseInt(req.body.leagueHomeAG);
    if (req.body.leagueAwayAG)
      statsFields.leagueAwayAG = parseInt(req.body.leagueAwayAG);

    //Lig Ev Sahibi Ortalaması
    league.homeAGaverage = statsFields.leagueHomeAG / statsFields.leagueOMS;
    league.homeYGaverage = statsFields.leagueAwayAG / statsFields.leagueOMS;

    // Lig Misafir Ortalaması
    league.awayAGaverage = league.homeYGaverage;
    league.awayYGaverage = league.homeAGaverage;

    //Ev Sahibi Takım Ortalaması
    home.AGaverage = statsFields.homeAG / statsFields.homeOMS;
    home.YGaverage = statsFields.homeYG / statsFields.homeOMS;

    //Ev Sahibi Takım Gücü
    home.powerAttack = home.AGaverage / league.homeAGaverage;
    home.powerDefense = home.YGaverage / league.homeYGaverage;

    //Misafir Takım Ortalaması
    away.AGaverage = statsFields.awayAG / statsFields.awayOMS;
    away.YGaverage = statsFields.awayYG / statsFields.awayOMS;

    //Misafir Takım Gücü
    away.powerAttack = away.AGaverage / league.awayAGaverage;
    away.powerDefense = away.YGaverage / league.awayYGaverage;

    //Ev Sahibi Düzeltilmiş Gol Ortalaması
    home.reCalculateAGaverage =
      home.powerAttack * away.powerDefense * league.homeAGaverage;

    //Misafir Düzeltilmiş Gol Ortalaması
    away.reCalculateAGaverage =
      away.powerAttack * home.powerDefense * league.awayAGaverage;

    // Home Poisson
    home.zero = poisson(0, home.reCalculateAGaverage);
    home.one = poisson(1, home.reCalculateAGaverage);
    home.two = poisson(2, home.reCalculateAGaverage);

    // Away Poisson
    away.zero = poisson(0, away.reCalculateAGaverage);
    away.one = poisson(1, away.reCalculateAGaverage);
    away.two = poisson(2, away.reCalculateAGaverage);

    //Scores
    scores.zeroTozero = home.zero * away.zero;
    scores.oneToZero = home.one * away.zero;
    scores.twoToZero = home.two * away.zero;
    scores.zeroToOne = home.zero * away.one;
    scores.zeroToTwo = home.zero * away.two;
    scores.oneToOne = home.one * away.one;

    sum =
      scores.zeroTozero +
      scores.oneToZero +
      scores.twoToZero +
      scores.zeroToOne +
      scores.zeroToTwo +
      scores.oneToOne;

    res.json({
      id: req.user.id,
      league: {
        req: {
          oms: req.body.leagueOMS,
          homeAG: req.body.leagueHomeAG,
          awayAG: req.body.leagueAwayAG
        },
        homeAGaverage: league.homeAGaverage,
        homeYGaverage: league.homeYGaverage,
        awayAGaverage: league.awayAGaverage,
        awayYGaverage: league.awayYGaverage
      },
      home: {
        req: {
          OMS: req.body.homeOMS,
          AG: req.body.homeAG,
          YG: req.body.homeYG
        },
        averageAG: home.AGaverage,
        averageYG: home.YGaverage,
        attackPower: home.powerAttack,
        defensePower: home.powerDefense,
        reCalculateAGaverage: home.reCalculateAGaverage,
        poisson: {
          zero: home.zero,
          one: home.one,
          two: home.two
        }
      },
      away: {
        req: {
          OMS: req.body.awayOMS,
          AG: req.body.awayAG,
          YG: req.body.awayYG
        },
        averageAG: away.AGaverage,
        averageYG: away.YGaverage,
        attackPower: away.powerAttack,
        defensePower: away.powerDefense,
        reCalculateAGaverage: away.reCalculateAGaverage,
        poisson: {
          zero: away.zero,
          one: away.one,
          two: away.two
        }
      },
      scores: {
        zeroTozero: scores.zeroTozero,
        oneToZero: scores.oneToZero,
        twoToZero: scores.twoToZero,
        zeroToOne: scores.zeroToOne,
        zeroToTwo: scores.zeroToTwo,
        oneToOne: scores.oneToOne
      },
      under: sum,
      underBet: 1 / sum,
      overBet: 1 / (1 - sum)
    });
  }
);

module.exports = router;
