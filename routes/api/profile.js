const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/payment
// @desc    Add payment to profile
// @access  Private
router.post(
  '/payment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      // Payment Info
      const newPayment = {
        paymenttype: req.body.paymenttype,
        selectedpackage: req.body.selectedpackage,
        selectedleagues: req.body.selectedleagues.split(','),
        selectedexpert: req.body.selectedexpert,
        starteddate: req.body.starteddate,
        endeddate: req.body.endeddate,
        totalprice: req.body.totalprice,
        status: req.body.status
      };

      if (!profile) {
        const profileFields = {};

        profileFields.user = req.user.id;
        profileFields.vip = req.body.vip;
        profileFields.paymentinfo = newPayment;

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      } else if (
        profile.paymentinfo.filter(item => item.status === true).length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyactive: 'User already active status' });
      } else {
        // Add to payment array
        profile.paymentinfo.unshift(newPayment);

        profile.save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
