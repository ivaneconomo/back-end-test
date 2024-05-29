const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DATA BASE CONNECTED');
  } catch (error) {
    console.error(error.message);
  }
};

dbConnection();
