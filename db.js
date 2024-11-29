const { Sequelize } = require('sequelize');

// Configuration de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base
  process.env.DB_USER, // Nom d'utilisateur
  process.env.DB_PASSWORD, // Mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false,
      } : false,
    },
    define: {
      createdAt: 'added',
      updatedAt: 'updated',
    },
  }
);

// Tester la connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
