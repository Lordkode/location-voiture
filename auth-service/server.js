const app = require("./src/app");
const { Sequelize } = require("sequelize");
const path = require("path");
const config = require(path.resolve(__dirname, "config/config.json"));
const PORT = process.env.PORT || 3000;

//Mise en place de l'environnement
const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

// Créer une instance de Sequilize avec la configuration de la base de données
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions ? dbConfig.dialectOptions : {},
    port: 5432,
    logging: false,
  }
);

// Tester la connexion avec la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("❌ Impossible de se connecter à la base de données :", err);
  });

app.listen(PORT, () => {
  console.log(`Auth-service en cours d'exécution sur le port : ${PORT}`);
});
