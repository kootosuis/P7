const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config({ path: "../.env" });
const User = require("../06models/user");
const Share = require("../06models/share");
const validator = require("validator");

exports.signup = (req, res, next) => {
    const RBUP = req.body.USER_password;
    if (!validator.isStrongPassword(RBUP)) {
        res.status(400).json({
            error: "Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial",
        });
    } else {
        bcrypt
            // hash (mdp, tourDeSalage)
            .hash(RBUP, 10)
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
    }
};

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
                        token: jwt.sign({ UserId: inlogger.USER_id }, process.env.SECRET_TOKEN, { expiresIn: "12h" }),
                        message: "Login validé !",
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.modifySignup = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;
    const RBUP = req.body.USER_password;

    if (!RBUP) {
        User.findOne({ where: { USER_id: loggedUserId } })
            .then((oldInfo) => {
                User.update(
                    {
                        USER_name: req.body.USER_name,
                        USER_firstname: req.body.USER_firstname,
                        USER_email: req.body.USER_email,
                        USER_departement: req.body.USER_departement,
                        USER_role: req.body.USER_role,
                    },
                    { where: { USER_id: loggedUserId } }
                )
                    .then(() => res.status(201).json({ message: "Informations mises à jour" }))
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(500).json(err));
    } else if (RBUP && !validator.isStrongPassword(RBUP)) {
        res.status(400).json({
            error: "Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial",
        });
    } else if (RBUP && validator.isStrongPassword(RBUP)) {
        User.findOne({ where: { USER_id: loggedUserId } })
            .then((oldInfo) => {
                bcrypt.compare(RBUP, oldInfo.USER_password).then((valid) => {
                    if (valid) {
                        res.status(400).json({ error: "Mot de passe identique" });
                    } else if (!valid) {
                        bcrypt
                            .hash(RBUP, 10) //
                            .then((hash) => {
                                User.update(
                                    {
                                        USER_name: req.body.USER_name,
                                        USER_firstname: req.body.USER_firstname,
                                        USER_email: req.body.USER_email,
                                        USER_departement: req.body.USER_departement,
                                        USER_role: req.body.USER_role,
                                        USER_password: hash,
                                    },
                                    { where: { USER_id: loggedUserId } }
                                )
                                    .then(() => res.status(201).json({ message: "Mot de passe modifié avec succès" }))
                                    .catch((err) => res.status(400).json(err));
                            });
                    }
                });
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(502).json({ error });
    }
};

exports.delete = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    User.findOne({ where: { USER_id: loggedUserId } }).then(() => {
        User.destroy({ where: { USER_id: loggedUserId } })
            .then(() => {
                console.log("Vos partages ont été supprimés");
            })
            .catch((error) => res.status(400).json({ error }));
    });
}; // PENSER A VERIFIER L'EFFACEMENT DES SHARE ET DES COMMENT !!!!!!


exports.getOneUser = (req, res) => {
    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    User.findOne({ where: { USER_id: paramsId}}) // à définir : ce qui va être vu par les autres, et où on répond à cette requête...
    .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL USERS //---- //----- GET A QUERY 
exports.getAllUsers = (req, res) => {
    User.findAll({})
    .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ error }));
};
