const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPass,
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 30000,
    },
  },
);

const dbConnection = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection successful.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

dbConnection();

module.exports = sequelize;
