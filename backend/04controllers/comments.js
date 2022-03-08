const User = require("../06models/user");
const Share = require("../06models/share");
const Comment = require("../06models/comment");
const fs = require("fs");

exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    // si commentaire de commentaire?

    // si commentaire
    // récuperer id du share
    const commentedShareId = req.params.id; // à vérifier

    if (req.body) {
        Comment.create({
            COMMENT_id: req.body.COMMENT_id,
            COMMENT_texte: req.body.COMMENT_texte,
            userUSER_id: loggedUserId,
            shareSHARE_id: commentedShareId,
        }) //
            .then(() => res.status(201).json({ message: "Commentaire publié !" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        res.status(500).json({ error });
    }
};

exports.updateComment = (req, res) => {
    // recevoir la requete
    // identifier le user et récuperer son id
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    // identifier le comment à modifier

    // verifier que le user est bien le créateur du comment

    // puis idem que create comment
};

exports.deleteComment = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Comment.findOne({ where: { COMMENT_id: paramsId } }) // identifier le commentaire à effacer
        .then((comment) => {
            // verifier que le user est bien le créateur du commentaire
            if (!comment.userUSER_id == loggedUserId) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour effacer ce commentaire.",
                });
            } else {
                // verifier que  tous les commentaires liés sont effacés

                // puis effacer le commentaire
                Comment.destroy({ where: { COMMENT_id: paramsId } })
                    .then(() => res.status(201).json({ message: "Commentaire effacé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
}; // PENSER A VERIFIER L'EFFACEMENT DES COMMENT ASSOCIES !!!!!!

exports.getOneComment = (req, res) => {
    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Comment.findOne({ where: { COMMENT_id: paramsId } })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

//----- GET ALL COMMENTS //---- //----- GET A QUERY // comment faire une recherche ?
exports.getAllComment = (req, res) => {
    Comment.findAll({})
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ error }));
};

//----- LIKE DISLIKE (il faudrait ajouter une colonne dans la table commentaire ou dans la table share)

// exports.likeOrDislikeComment = (req, res) =>{
// PROJET A COMPLETER
// };
