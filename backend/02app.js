const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// version 1
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(process.env.DBCONNECT);

// version 2 
const Sequelize = require("sequelize");
const sequelize = new Sequelize('groupomania', 'root', process.env.MYSQLPASSWORD, {
    host: "localhost",
    dialect: "mysql",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000
    // },
});

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
