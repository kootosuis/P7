const express = require("express");
const app = express();

// const dotenv = require("dotenv");
// dotenv.config();

const path = require("path");
const helmet = require("helmet");

//////---- accès au dossier Routes -----///

const userRoutes = require("./03routes/user");
// const sharesRoutes = require("./03routes/shares");
// const commentsRoutes = require("./03routes/comments");

//////////--------- SEQUELIZE --------////////////
// connection
const sequelize = require("./01utils/DBconnect");

// creation des tables
const sync = require("./01utils/DBsync");



////////--------- JSON ---------------------------------------------------------------------------------///
//////// ---- Gestion de la requête POST venant de l'application front-end, extraction du corps JSON ---///

app.use(express.json());



////////--------- CORS ---------------------------///
////////--------- éviter les erreurs de CORS -----///

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));



//////---------STOCKAGE DES MEDIAS ------------/////////

app.use("/07media", express.static(path.join(__dirname, "images")));



///////////////-----------ROUTES-------------------/////////

app.use("/api/auth", userRoutes);
// app.use("/api/shares", sharesRoutes);
// app.use("/api/comments", commentsRoutes);

////////------- TESTS --------------------/////////////////

// app.use((req, res, next) => {
//     console.log("Requête reçue !");
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: "Votre requête a bien été reçue !" });
//     next();
// });

// app.use((req, res, next) => {
//     console.log("Réponse envoyée avec succès !");
// });

// app.put("/", (req, res) => {
//     res.json({ message: "PUT test." });
// });

// app.post("/", (req, res) => {
//     res.json({ message: "POST test." });
// });

// app.delete("/", (req, res) => {
//     res.json({ message: "DELETE test." });
// });

// app.get("/", (req, res) => {
//     res.json({ message: "GET test." });
// });

////////  ------------ retour vers serveur -------------   /////

module.exports = app;
