const jwt = require("jsonwebtoken");
const User = require("../06models/user");
const Share = require("../06models/share");
const Media = require("../06models/media");
const fs = require("fs");

exports.createShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    Share.create({
        SHARE_text: req.body.SHARE_text, // la taille du texte a été définie dans le model à 10 000 signes
        userUSERId: loggedUserId,
    })
        .then(() => {
            if (req.file) {
                Share.findOne({ where: { SHARE_text: req.body.SHARE_text } && { userUSERId: loggedUserId } }) // on récupère le share qui vient juste d'être créé
                    .then((share) => {
                        console.log(share);
                        Media.create({
                            // et on ajoute le media
                            MEDIA_name: req.file.filename,
                            MEDIA_mimetype: req.file.mimetype,
                            MEDIA_size: req.file.size,
                            MEDIA_description: req.file.description,
                            MEDIA_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, // le filename est ici fabriqué par multer
                            shareSHAREId: share.SHARE_id,
                        });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .then(() => res.status(201).json({ message: "Partage publié !" }))
        .catch((error) => res.status(500).json({ error }));
};

exports.updateShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;
    console.log(decodedToken.UserId);
    const paramsId = req.params.id;
    console.log("test" + req.params.id); // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Share.findOne({ where: { SHARE_id: paramsId } }) // identifier le share à modifier
        .then((share) => {
            if (!share.userUSERId == loggedUserId) {
                // verifier que le user est bien le créateur du share
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour modifier ce partage.",
                });
            } else {
                Share.update({
                    SHARE_text: req.body.SHARE_text, // la taille du texte a été définie dans le model à 10 000 signes
                    userUSERId: loggedUserId,
                })
                    // .then(() => {
                    //     if (req.file) {
                    //         Share.findOne({ where: { SHARE_text: req.body.SHARE_text } && { userUSERId: loggedUserId } }) // on récupère le share qui vient juste d'être updaté
                    //             //ici il faut effacer l'ancien media (à voir)
                    //             .then((share) => {
                    //                 Media.update({
                    //                     // et on ajoute le media
                    //                     MEDIA_name: req.file.filename,
                    //                     MEDIA_mimetype: req.file.mimetype,
                    //                     MEDIA_size: req.file.size,
                    //                     MEDIA_description: req.file.description,
                    //                     MEDIA_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, // le filename est ici fabriqué par multer
                    //                     shareSHAREId: share.SHARE_id,
                    //                 });
                    //             })
                    //             .catch((error) => res.status(400).json({ error }));
                    //     }
                    // })
                    .then(() => res.status(201).json({ message: "Partage mis à jour !" }))
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

exports.deleteShare = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Share.findOne({ where: { SHARE_id: paramsId } }) // identifier le share à effacer
        .then((share) => {
            // verifier que le user est bien le créateur du share
            if (!share.userUSERId == loggedUserId) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour effacer ce partage.",
                });
            } else {
                // se débarasser de l'ancienne image

                // verifier que  tous les commentaires liés sont effacés

                // puis effacer le share
                Share.destroy({ where: { SHARE_id: paramsId } })
                    .then(() => res.status(201).json({ message: "Partage effacé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
}; // PENSER A VERIFIER L'EFFACEMENT DES COMMENT !!!!!!

exports.getOneShare = (req, res) => {
    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Share.findOne({ where: { SHARE_id: paramsId } })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL SHARES //---- //----- GET A QUERY // comment faire une recherche ?
exports.getAllShare = (req, res) => {
    Share.findAll({})
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ error }));
};

//----- LIKE DISLIKE (il faudrait ajouter une colonne dans la table commentaire ou dans la table share)

// exports.likeOrDislikeShare = (req, res) =>{
// PROJET A COMPLETER
// };
