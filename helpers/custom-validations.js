const User = require('../models/user-model');

const isEmailInUse = async (email) => {
  const isExists = await User.findOne({ email });

  if (isExists) {
    throw new Error(`El e-mail ${email} ya está en uso.`);
  }
  return false;
};

module.exports = {
  isEmailInUse,
};
