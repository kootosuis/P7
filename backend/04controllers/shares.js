const jwt = require("jsonwebtoken");
const User = require("../06models/user");
const Share = require("../06models/share");
const Media = require("../06models/media");
const Comment = require("../06models/comment");

const fs = require("fs");

exports.createShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;

    const SharedText = req.body.ShareText ? req.body.ShareText : "Sans commentaire";

    Share.create({
        ShareText: SharedText,
        // la taille du texte a été définie dans le model à 10 000 signes
        userUserId: loggedUserId,
    })
        .then((share) => {
            if (req.file) {
                const MediaDescription = req.file.description ? req.file.description != null : "Aucune description n'a été fournie pour cette image";
                // Share.findOne({ where: { ShareText: req.body.ShareText } && { userUserId: loggedUserId } }) // on récupère le share qui vient juste d'être créé
                //     .then((share) => {
                Media.create({
                    // et on ajoute le media
                    MediaName: req.file.filename,
                    MediaMimetype: req.file.mimetype,
                    MediaSize: req.file.size,
                    MediaDescription: MediaDescription,
                    MediaUrl: `${req.protocol}://${req.get("host")}/07media/${req.file.filename}`, // le filename est ici fabriqué par multer
                    shareShareId: share.ShareId,
                })
                    // })
                    .catch((error) => res.status(400).json({ error }));
            } else {
                // Share.findOne({ where: { ShareText: req.body.ShareText } && { userUserId: loggedUserId } }) // on récupère le share qui vient juste d'être créé
                //     .then((share) => {
                Media.create({
                    // et on ajoute le media
                    MediaName: "Une icône",
                    MediaMimetype: "image/png",
                    MediaSize: 29000,
                    MediaDescription: "La plume de l'écrivain",
                    MediaUrl: `${req.protocol}://${req.get("host")}/07media/feather.png`, // name + Date.now() + "." + extension
                    shareShareId: share.ShareId,
                })
                    // })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .then(() => res.status(201).json({ message: "Partage publié !" }))
        .catch((error) => res.status(500).json({ error }));
};

/////////-----------------est-ce vraiment utile -------------------///////////// (corrections de fautes d'orthographe)
///--- je n'implémente pas le changement d'image... le cas échéant l'utilisateur devra effacer son post ------/////
exports.updateShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;
    const ShareId = req.body.ShareId;

    Share.findOne({ where: { ShareId: ShareId } })
        .then((share) => {
            if (!share.userUserId == loggedUserId) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour modifier ce partage.",
                });
            } else {
                Share.update({ ShareText: req.body.ShareText }, { where: { ShareId: ShareId } })
                    .then(() => res.status(201).json({ message: "Partage mis à jour !" }))
                    .catch((error) => res.status(404).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;

    this.isAdmin = "";

    User.findOne({ where: { UserId: loggedUserId } })
        .then((loggedUser) => {
            this.isAdmin = loggedUser.UserHabilitation;
        })
        .catch((error) => res.status(error).json(error));

    const ShareId = req.body.ShareId;

    Share.findOne({ where: { ShareId: ShareId } })
        .then((share) => {
            if (!share.userUserId == loggedUserId || isAdmin == 0) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour effacer ce partage.",
                });
            } else {
                Media.findOne({ where: { shareShareId: ShareId } }) //
                    .then((media) => {
                        if (media.MediaUrl == `${req.protocol}://${req.get("host")}/07media/feather.png`) {
                            Share.destroy({ where: { ShareId: ShareId } })
                                .then(() => res.status(201).json({ message: "Partage effacé !" }))
                                .catch((error) => res.status(400).json({ error }));
                        } else {
                            const filename = media.MediaUrl.split("/07media/")[1];
                            fs.unlink(`07media/${filename}`, () => {
                                Share.destroy({ where: { ShareId: ShareId } })
                                    .then(() => res.status(201).json({ message: "Partage effacé !" }))
                                    .catch((error) => res.status(400).json({ error }));
                            });
                        }
                    });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

//----- GET  A SPECIFIC SHARE //
exports.getOneShare = (req, res) => {
    const paramsId = req.params.id;

    Share.findOne({ where: { ShareId: paramsId }, include: [User, Media, Comment] })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL SHARES //
exports.getAllShare = (req, res) => {
    Share.findAll({ include: [User, Media, Comment], order: [["updatedAt", "DESC"]] })
        // [`comments.updatedAt`, "DESC"],
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ error }));
};

//---------------------- PROJET A COMPLETER--------------------------//
//----- LIKE DISLIKE (il faudrait ajouter une colonne dans la table commentaire ou dans la table share)
// exports.likeOrDislikeShare = (req, res) =>{
// };
