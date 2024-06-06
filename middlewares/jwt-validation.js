const jwt = require('jsonwebtoken');

const jwtValidator = async (req, res, next) => {
  try {
    const token = req.headers['access-token'];
    if (!token) return res.status(401).json('Token inexistente.');
    jwt.verify(token, process.env.SECRET, (error) => {
      if (error) return res.status(401).json('Token inválido.');
      next();
    });

    console.log(token);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      message:
        'Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.',
    });
  }
};

module.exports = { jwtValidator };