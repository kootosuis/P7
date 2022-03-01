const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const logger = 'bob';
// version 1
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DBCONNECT, {
          
    logging: console.log, // Default, displays the first parameter of the log function call
//     logging: (...msg) => console.log(msg), // Displays all log function call parameters
//     logging: false, // Disables logging
//     logging: (msg) => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
//     logging: logger.debug.bind(logger), // Alternative way to use custom logger, displays all messages
});

// version 2
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize('groupomania', 'root', process.env.MYSQLPASSWORD, {
//     host: "localhost",
//     dialect: "mysql",
//     // pool: {
//     //   max: 5,
//     //   min: 0,
//     //   idle: 10000
//     // },
// });

// version 3
// const Sequelize = require('sequelize');
// const path = 'mysql://root:rootpasswordYESYES2000@localhost:3306/groupomania';
// const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize
    .authenticate()
    .then(() => console.log("Connection to database has been established successfully."))
    .catch(() => console.error("Unable to connect to the database."));

// sequelize.authenticate()
// .then(() => {
//   console.log('Connection established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// }).finally(() => {
//   sequelize.close();
// });

const app = express();
app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

app.use((req, res, next) => {
    console.log("Réponse envoyée avec succès !");
});

module.exports = app;
