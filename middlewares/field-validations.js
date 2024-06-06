const { body } = require('express-validator');
const { isEmailInUse } = require('../helpers/custom-validations');

const firstNameFieldValidation = [
  body('firstName')
    .trim()
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage('El campo solo puede contener letras y espacios.')
    .isLength({ min: 2, max: 32 })
    .withMessage('El campo debe contener entre 2 y 32 caracteres.')
    .notEmpty()
    .withMessage('El campo es requerido.'),
];

const lastNameFieldValidation = [
  body('lastName')
    .trim()
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/)
    .withMessage('El campo solo puede contener letras y espacios.')
    .isLength({ min: 2, max: 32 })
    .withMessage('El campo debe contener entre 2 y 32 caracteres.')
    .notEmpty()
    .withMessage('El campo es requerido.'),
];

const emailFieldValidationBase = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Formato de email no válido.')
    .notEmpty()
    .withMessage('El campo es requerido.'),
];

const emailFieldValidationWithCustomCheck = [
  ...emailFieldValidationBase,
  body('email').custom(isEmailInUse),
];

const ageFieldValidation = [
  body('age')
    .isInt({ min: 1, max: 100 })
    .withMessage('El rango de edad es entre 1 y 100 años.')
    .notEmpty()
    .withMessage('El campo es requerido.'),
];

const passwordFieldValidation = [
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('El campo debe contener entre 8 y 128 caracteres.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/
    )
    .withMessage(
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&).'
    )
    .notEmpty()
    .withMessage('El campo es requerido.'),
];

const checkPasswordFieldValidation = [
  body('checkPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Las contraseñas deben coincidir.')
    .notEmpty()
    .withMessage('Repetir contraseña es requerido.'),
];

module.exports = {
  firstNameFieldValidation,
  lastNameFieldValidation,
  emailFieldValidationBase,
  emailFieldValidationWithCustomCheck,
  ageFieldValidation,
  passwordFieldValidation,
  checkPasswordFieldValidation,
};
