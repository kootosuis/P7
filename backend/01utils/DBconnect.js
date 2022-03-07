const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DBCONNECT);

sequelize
    .authenticate()
    .then(() => console.log("Connection to database has been established successfully."))
    .catch(() => console.error("Unable to connect to the database."));

module.exports = sequelize;
