const User = require("../06models/user");
const Share = require("../06models/share");
const Media = require("../06models/media");
const fs = require("fs");

// D0NT'FORGET TO SET UP MULTER

exports.createShare = (req, res) => {
    // recevoir la requete
    // identifier le user et récuperer son id (en termes de)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    // reperer s'il y a un media ou non
    // si non
    if (!req.file) {
        Share.create({
            SHARE_text: req.body.SHARE_text,
            userUSER_id: loggedUserId,
        })
            .then(() => res.status(201).json({ message: "Partage publié !" }))
            .catch((error) => res.status(400).json({ error }));
    } else if (req.file) {
        Media.create({
            MEDIA_name: req.file.filename,
            MEDIA_type: req.file.type,
            MEDIA_size: req.file.size,
            MEDIA_description: req.file.description,
            MEDIA_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, // à vérifier, le filename est ici fabriqué par multer
        }) //
            .then(() => {
                Media.findOne({ where: { MEDIA_name: req.file.filename } }) //
                    .then((media) => {
                        Share.create({
                            SHARE_text: req.body.SHARE_text,
                            userUSER_id: loggedUserId,
                            mediumMEDIA_id: media.MEDIA_id,
                        })
                            .then(() => res.status(201).json({ message: "Partage publié !" }))
                            .catch((error) => res.status(400).json({ error }));
                    })
                    .catch((error) => res.status(401).json({ error }));
            })
            .catch((error) => res.status(402).json({ error }));
    } else {
        res.status(500).json({ error });
    }
};

exports.updateShare = (req, res) => {
    // recevoir la requete
    // identifier le user et récuperer son id
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Share.findOne({ where: { SHARE_id: paramsId } }) // identifier le share à modifier
        .then((share) => {
            if (!share.userUSER_id == loggedUserId) {
                // verifier que le user est bien le créateur du share
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour modifier ce partage.",
                });
            } else {
                if (!req.file) {
                    Share.update({
                        SHARE_text: req.body.SHARE_text,
                        userUSER_id: loggedUserId,
                    })
                        .then(() => res.status(201).json({ message: "Partage modifié !" }))
                        .catch((error) => res.status(400).json({ error }));
                } else if (req.file) {
                    // si changement image se débarrasser de l'ancienne image ? (pas sûr, ça rend les choses très compliquées, mieux vaut effacer le share)
                    Media.update({
                        MEDIA_name: req.file.filename,
                        MEDIA_type: req.file.type,
                        MEDIA_size: req.file.size,
                        MEDIA_description: req.file.description,
                        MEDIA_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, // à vérifier, le filename est ici fabriqué par multer
                    }) //
                        .then(() => {
                            Media.findOne({ where: { MEDIA_name: req.file.filename } }) //
                                .then((media) => {
                                    Share.create({
                                        SHARE_text: req.body.SHARE_text,
                                        userUSER_id: loggedUserId,
                                        mediumMEDIA_id: media.MEDIA_id,
                                    })
                                        .then(() => res.status(201).json({ message: "Partage modifié !" }))
                                        .catch((error) => res.status(400).json({ error }));
                                })
                                .catch((error) => res.status(401).json({ error }));
                        })
                        .catch((error) => res.status(402).json({ error }));
                } else {
                    res.status(500).json({ error });
                }
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
            if (!share.userUSER_id == loggedUserId) {
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
