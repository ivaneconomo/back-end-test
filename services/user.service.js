const User = require('../models/user.model');

const getAllUsersService = async () => {
  return await User.find();
};

const getUserByIdService = async (id) => {
  return await User.findById(id);
};

const createUserService = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const replaceUserService = async (id, userData) => {
  return await User.findOneAndReplace({ _id: id }, userData);
};

const editUserService = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData);
};

const deleteUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  replaceUserService,
  editUserService,
  deleteUserService,
};
