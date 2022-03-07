const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config({ path: "../.env" });
const User = require("../06models/user");

///-------------- SIGN UP --------------//
exports.signup = (req, res, next) => {
    bcrypt
        // hash (mdp, tourDeSalage)
        .hash(req.body.USER_password, 10)
        // then (promise)
        .then((hash) => {
            User.create({
                USER_name: req.body.USER_name,
                USER_firstname: req.body.USER_firstname,
                USER_email: req.body.USER_email,
                USER_departement: req.body.USER_departement,
                USER_role: req.body.USER_role,
                USER_password: hash,
            })
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// //-------------- LOGIN --------------//
exports.login = (req, res, next) => {
    User.findOne({ where: { USER_email: req.body.USER_email } })
        .then((inlogger) => {
            if (!inlogger) {
                // si on ne trouve pas l'email dans la BDD
                return res.status(401).json({ message: "Utilisateur non trouvé !" });
            }
            bcrypt // si l'e-mail correspond à un utilisateur existant, on compare le mdp entré par l'utilisateur avec le hash enregistré dans la BDD :
                .compare(req.body.USER_password, inlogger.USER_password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        UserId: inlogger.USER_id,
                        token: jwt.sign({ userId: inlogger.USER_id }, process.env.SECRET_TOKEN, { expiresIn: "12h" }),
                        message: "Login validé !",
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.modifySignup = (req, res) => {
    // récuperer les infos old user

    // garder l'id

    // si modification du mot de passe:

    // si pas modification du mot de passe :

    User.update({
        USER_name: req.body.USER_name,
        USER_firstname: req.body.USER_firstname,
        USER_email: req.body.USER_email,
        USER_departement: req.body.USER_departement,
        USER_role: req.body.USER_role,
        // USER_password: hash,
    })
        .then(() => res.status(201).json({ message: "Données modifiées !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
    console.log("userroutes test3");
};
