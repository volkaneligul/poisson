const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load User model
const Tur = require('../../models/Tur');

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
    const { country, isSaveMongo } = req.body;
    //const { schedule } = sheetToJson(country + '.xlsx');
    const schedule = {};
    if (isSaveMongo) {
      Tur.find().then(tur => {
        if (tur.length > 0) {
          res.json(tur);
        } else {
          schedule.map(obj => {
            const newTur = new Tur({
              DA: obj.DA,
              DAV: obj.DAV,
              DB: obj.DB,
              DG: obj.DG,
              DM: obj.DM,
              DO: obj.DO,
              DPUAN: obj.DPUAN,
              DY: obj.DY,
              IA: obj.IA,
              IAV: obj.IAV,
              IB: obj.IB,
              IG: obj.IG,
              IM: obj.IM,
              IO: obj.IO,
              IPUAN: obj.IPUAN,
              IY: obj.IY,
              Order: obj.Order,
              TA: obj.TA,
              TAV: obj.TAV,
              TB: obj.TB,
              TG: obj.TG,
              TM: obj.TM,
              TO: obj.TO,
              TPUAN: obj.TPUAN,
              TY: obj.TY,
              Team: obj.Team
            });

            newTur
              .save()
              .then()
              .catch(err => console.log(err));
          });

          res.json(schedule);
        }
      });
    } else {
      res.json(schedule);
    }
  }
);

module.exports = router;
