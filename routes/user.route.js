const { Router } = require('express');
const { body } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  editUser,
  disableUser,
  deleteUser,
} = require('../controllers/user.controller');
const { emailValidation } = require('../helpers/validations');
const { jwtValidator } = require('../middlewares/jwtValidation');

const route = Router();

route.get('/get-users', jwtValidator, getAllUsers);

route.get('/get-user-by-id/:id', getUserById);

route.post(
  '/create-user',
  body('email')
    .isEmail()
    .withMessage('Formato e-mail inválido.')
    .notEmpty()
    .custom(emailValidation),
  body('password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .withMessage('La contraseña no cumple los requisitos.'),
  createUser
);

route.put('/replace-user/:id', replaceUser);

route.patch('/edit-user/:id', editUser);

route.patch('/disable-user/:id', disableUser);

route.delete('/delete-user/:id', deleteUser);

module.exports = route;
