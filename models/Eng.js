const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EngSchema = new Schema({
  Order: {
    type: String,
    required: true
  },
  Team: {
    type: String,
    required: true
  },
  TO: {
    type: String,
    required: true
  },
  TG: {
    type: String,
    required: true
  },
  TB: {
    type: String,
    required: true
  },
  TM: {
    type: String,
    required: true
  },
  TA: {
    type: String,
    required: true
  },
  TY: {
    type: String,
    required: true
  },
  TAV: {
    type: String,
    required: true
  },
  TPUAN: {
    type: String,
    required: true
  },
  IO: {
    type: String,
    required: true
  },
  IG: {
    type: String,
    required: true
  },
  IB: {
    type: String,
    required: true
  },
  IM: {
    type: String,
    required: true
  },
  IA: {
    type: String,
    required: true
  },
  IY: {
    type: String,
    required: true
  },
  IAV: {
    type: String,
    required: true
  },
  IPUAN: {
    type: String,
    required: true
  },
  DO: {
    type: String,
    required: true
  },
  DG: {
    type: String,
    required: true
  },
  DB: {
    type: String,
    required: true
  },
  DM: {
    type: String,
    required: true
  },
  DA: {
    type: String,
    required: true
  },
  DY: {
    type: String,
    required: true
  },
  DAV: {
    type: String,
    required: true
  },
  DPUAN: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Eng = mongoose.model('eng', EngSchema);
