const {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  replaceUserService,
  editUserService,
  deleteUserService,
} = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const resp = await getAllUsersService();
    if (resp.length != 0) {
      res.status(200).json(resp);
      return;
    }
    res.status(404).json(`No se han encontrado usuarios.`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getUserByIdService(id);
    if (resp) {
      res.status(200).json(resp);
      return;
    }
    res.status(404).json(`No se ha encontrado el ususario con el id ${id}`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }
  try {
    const userData = req.body;
    const saltRounds = bcrypt.genSaltSync();
    userData.password = bcrypt.hashSync(userData.password, saltRounds);
    const user = await createUserService(userData);

    const userResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const replaceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const resp = await replaceUserService(id, userData);
    if (resp) {
      res.status(200).json(resp);
      return;
    }
    res
      .status(400)
      .json(`No se ha podido reemplazar el usuario con el ID ${id}`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const resp = await editUserService(id, userData);
    if (resp) {
      res.status(200).json(resp);
      return;
    }
    res.status(400).json(`No se pudo editar el usuario con el ID ${id}`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const disableUser = { disabled: true };
    const resp = await editUserService(id, disableUser);
    if (resp) {
      res.status(200).json(resp);
    }
    res.status(400).json(`No se ha deshabilitado al usuario con el ID ${id}`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await deleteUserService(id);
    if (resp) {
      res.status(200).json(resp);
      return;
    }
    res.status(400).json(`No se ha podido eliminar el usuario con el ID ${id}`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  editUser,
  disableUser,
  deleteUser,
};
