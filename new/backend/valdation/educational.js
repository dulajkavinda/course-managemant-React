const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  /* data.company = !isEmpty(data.handle) ? data.company : ''; */
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.campus = !isEmpty(data.campus) ? data.campus : '';
  data.gpa = !isEmpty(data.gpa) ? data.gpa : '';
  data.address = !isEmpty(data.address) ? data.address : '';

 
  if (Validator.isEmpty(data.status)) {
    errors.email = 'email field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.phone = 'phone field is required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.campus = 'campus field is required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.gpa = 'gpa field is required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.address = 'address field is required';
  }
}