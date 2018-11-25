const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(paymentinfo) {
  let errors = {};

  //paymentinfo.vip = paymentinfo.vip ? paymentinfo.vip : false;
  paymentinfo = paymentinfo ? paymentinfo : false;

  /*if (!paymentinfo.vip) {
    errors.vip = 'Profile have to vip';
  }*/

  if (!paymentinfo) {
    errors.paymentinfo = 'Profile payment info is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
