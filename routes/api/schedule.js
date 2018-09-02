const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/test', (req, res) => res.json({ msg: 'schedule Works' }));

// Load Schedule
const sheetToJson = require('../../excel/schedule');

// @route   GET api/schedule/
// @desc    leagues schedule
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { schedule } = sheetToJson(req.body.file);

    res.json(schedule);
  }
);

module.exports = router;
