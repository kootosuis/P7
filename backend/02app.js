const express = require("express");
const app = express();

// const dotenv = require("dotenv");
// dotenv.config();

const path = require("path");
const helmet = require("helmet");

const userRoutes = require("./03routes/user");
const sharesRoutes = require("./03routes/shares");
const commentsRoutes = require("./03routes/comments");

const sequelize = require("./01utils/DBconnect");
const sync = require("./01utils/DBsync");

////////--------- EXTRACTION DU CORPS JSON
////////----------Gestion de la requête POST venant de l'application front-end
app.use(express.json());

////////--------- CORS & HELMET ---------------------------///

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

//////---------STOCKAGE DES MEDIAS ------------/////////

app.use("/07media", express.static(path.join(__dirname, "images")));

//////-----------ROUTES-----------------------/////////

app.use("/api/auth", userRoutes);
app.use("/api/shares", sharesRoutes);
app.use("/api/comments", commentsRoutes);

//////-----------EXPORT ----------------------////////

module.exports = app;
