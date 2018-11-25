const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  vip: {
    type: Boolean,
    default: false
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
        type: Date
      },
      endeddate: {
        type: Date
      },
      totalprice: {
        type: String
      },
      status: {
        type: Boolean
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
