const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(401)
        .json({ message: 'Email o contraseña incorrectos.' });
    }
    const match = bcrypt.compareSync(password, findUser.password);
    if (match) {
      const payload = {
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
      };

      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 600 });

      res.status(200).json({ message: 'Login exitoso.', token });
    } else {
      res.status(401).json({ message: 'Email o contraseña incorrectos.' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      message:
        'Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.',
    });
  }
};

module.exports = {
  login,
};
