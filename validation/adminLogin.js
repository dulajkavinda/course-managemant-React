const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function valitadeAdminLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is reqired";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be 2 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is reqired";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
