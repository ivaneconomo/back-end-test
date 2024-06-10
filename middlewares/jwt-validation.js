const jwt = require('jsonwebtoken');

const jwtValidation = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json('Token inexistente.');

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) return res.status(401).json('Token inválido.');

      req.user = decoded;
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

module.exports = { jwtValidation };
