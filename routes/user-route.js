const { Router } = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  editUser,
  disableUser,
  deleteUser,
} = require('../controllers/user-controller');
const { jwtValidator } = require('../middlewares/jwt-validation');
const {
  userRegistrationValidation,
} = require('../middlewares/form-validations');
const { validateFields } = require('../middlewares/validation-middleware');

const route = Router();

route.get('/get-users', jwtValidator, getAllUsers);

route.get('/get-user-by-id/:id', getUserById);

route.post(
  '/create-user',
  userRegistrationValidation,
  validateFields,
  createUser
);

route.put('/replace-user/:id', replaceUser);

route.patch('/edit-user/:id', editUser);

route.patch('/disable-user/:id', disableUser);

route.delete('/delete-user/:id', deleteUser);

module.exports = route;
