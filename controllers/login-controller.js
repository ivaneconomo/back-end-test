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

    const match = await bcrypt.compare(password, findUser.password);

    if (match) {
      const payload = {
        id: findUser._id,
        role: findUser.role,
      };

      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login exitoso.',
        token: token,
        user: {
          id: findUser._id,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          age: findUser.age,
          email: findUser.email,
          role: findUser.role,
          avatar: findUser.avatar,
        },
      });
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
