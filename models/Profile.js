const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  paymentinfo: [
    {
      paymenttype: {
        type: String
      },
      selectedpackage: {
        type: String
      },
      selectedleagues: {
        type: [String]
      },
      selectedexpert: {
        type: String
      },
      starteddate: {
        type: Date,
        default: Date.now
      },
      endeddate: {
        type: Date
      },
      totalprice: {
        type: String
      },
      status: {
        type: String
      },
      vipcode: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
