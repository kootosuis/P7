const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config({ path: "../.env" });
const User = require("../06models/user");
const Share = require("../06models/share");
const validator = require("validator");
const Media = require("../06models/media");
const fs = require("fs");

////----- SIGNUP-----//
exports.signup = (req, res, next) => {
    const RBUP = req.body.UserPassword;
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
                    ...req.body,
                    UserPassword: hash,
                })
                    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    }
};
////----- LOGIN-----//
exports.login = (req, res, next) => {
    User.findOne({ where: { UserEmail: req.body.UserEmail } })
        .then((inlogger) => {
            if (!inlogger) {
                // si on ne trouve pas l'email dans la BDD
                return res.status(401).json({ message: "Utilisateur non trouvé !" });
            }
            bcrypt // si l'e-mail correspond à un utilisateur existant, on compare le mdp entré par l'utilisateur avec le hash enregistré dans la BDD :
                .compare(req.body.UserPassword, inlogger.UserPassword)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        UserEmail: inlogger.UserEmail,
                        token: jwt.sign({ UserId: inlogger.UserId }, process.env.SECRET_JWT_KEY, { expiresIn: "12h" }),
                        message: "Login validé !",
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
////-----    MODIFY    -----//
exports.modifySignup = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;

    const RBUP = req.body.UserPassword; // pour l'éventualité d'un changement de mot de passe

    const loggedUserEmail = req.params.id;

    if (!RBUP) {
        User.findOne({ where: { UserEmail: loggedUserEmail } })
            .then((oldInfo) => {
                User.update(
                    {
                        ...req.body,
                    },
                    { where: { UserEmail: loggedUserEmail } }
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
        User.findOne({ where: { UserEmail: loggedUserEmail } })
            .then((oldInfo) => {
                bcrypt.compare(RBUP, oldInfo.UserPassword).then((valid) => {
                    if (valid) {
                        res.status(400).json({ error: "Mot de passe identique" });
                    } else if (!valid) {
                        bcrypt
                            .hash(RBUP, 10) //
                            .then((hash) => {
                                User.update(
                                    {
                                        ...req.body,
                                        UserPassword: hash,
                                    },
                                    { where: { UserEmail: loggedUserEmail } }
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

////-----     DELETE   -----//
////------cette version fonctionne et permet de se débarasser des média liés aux shares !-------//////
exports.delete = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;

    const cardUserEmail = req.params.id;

    this.isAdmin = "";

    User.findOne({ where: { UserId: loggedUserId } })
        .then((loggedUser) => {
            this.isAdmin = loggedUser.UserHabilitation;
        })
        .catch((error) => res.status(error).json(error));

    User.findOne({ where: { UserEmail: cardUserEmail } }).then((user) => {
        if (user == null) {
            res.status(400).json({ message: " Cet utilisateur n'existe pas" });
        } else if (!user.UserId == loggedUserId || this.isAdmin === 0) { //quand j'écris == 0 ça ne marche pas
            //ceinture et bretelles
            res.status(401).json({ message: "Vous n'avez pas les autorisations nécéssaires pour cette opération." });
        } else if (user.UserId == loggedUserId || this.isAdmin == 1) {
            Share.findAll({ raw: true, where: { userUserId: user.UserId } })
                .then((shares) => {
                    const shareX = shares;
                    shareX.forEach((item, index) => {
                        Media.findOne({ raw: true, where: { shareShareId: item.ShareId } }) //
                            .then((media) => {
                                const filename = media.MediaUrl.split("/07media/")[1];
                                if (filename != "feather.png") {
                                    fs.unlink(`07media/${filename}`, () => {
                                        try {
                                            () => res.status(200).json({ message: "Fichier supprimé !" });
                                        } catch {
                                            (error) => res.status(400).json({ error });
                                        }
                                    });
                                } else {
                                    // do i have to write something...
                                }
                            })
                            .catch((error) => res.status(500).json({ message: "Il y a un truc qui cloche" }));
                    });
                })
                .then(() => {
                    User.destroy({ where: { UserEmail: cardUserEmail } })
                        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
                        .catch((error) => res.status(400).json({ error }));
                });
        } else {
            () => res.status(500).json({ error });
        }
    });
};

//-------GET ONE USER  ------//
exports.getOneUser = (req, res) => {
    const paramsId = req.params.id;

    User.findOne({ where: { UserEmail: paramsId } })
        .then((user) => {
            // delete user.dataValues.UserPassword, // avec cela, le password ne sera pas transmis au front
            res.status(200).json(user);
        })
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL USERS ------//
exports.getAllUsers = (req, res) => {
    User.findAll({ order: [["UserName", "ASC"]] })
        .then((users) => {
            users.forEach((item, index) => {
                // le password ne sera pas transmis au front
                delete item.dataValues.UserPassword;
            }),
                res.status(200).json(users);
        })
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL ADMINs ----//
exports.getAdmins = (req, res) => {
    User.findAll({ where: { UserHabilitation: 1 } })
        .then((users) => {
            users.forEach((item, index) => {
                // le password ne sera pas transmis au front
                delete item.dataValues.UserPassword;
            }),
                res.status(200).json(users);
        })
        .catch((error) => res.status(404).json({ error }));
};
