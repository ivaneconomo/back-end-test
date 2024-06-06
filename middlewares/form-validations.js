const {
  firstNameFieldValidation,
  lastNameFieldValidation,
  emailFieldValidationBase,
  emailFieldValidationWithCustomCheck,
  ageFieldValidation,
  passwordFieldValidation,
  checkPasswordFieldValidation,
} = require('./field-validations');

const userRegistrationValidation = [
  ...firstNameFieldValidation,
  ...lastNameFieldValidation,
  ...emailFieldValidationWithCustomCheck,
  ...ageFieldValidation,
  ...passwordFieldValidation,
  ...checkPasswordFieldValidation,
];

const userLoginValidation = [
  ...emailFieldValidationBase,
  ...passwordFieldValidation,
];

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
};
