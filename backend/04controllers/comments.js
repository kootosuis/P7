const jwt = require("jsonwebtoken");
const User = require("../06models/user");
const Share = require("../06models/share");
const Comment = require("../06models/comment");

exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    const totId = req.params.id;
    const commentedShareId = totId.split("&")[0]; // à vérifier
    const commentedCommentId = totId.split("&")[1];

    if (req.body) {
        Comment.create({
            CommentId: req.body.CommentId,
            CommentText: req.body.CommentText,
            userUserId: loggedUserId,
            shareShareId: commentedShareId,
            commentCommentId: commentedCommentId,
        }) //
            .then(() => res.status(201).json({ message: "Commentaire publié !" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        res.status(500).json({ error });
    }
};

exports.updateComment = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;
    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Comment.findOne({ where: { CommentId: paramsId } })
        .then((comment) => {
            if (!comment.userUserId == loggedUserId) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour modifier ce commentaire.",
                });
            } else {
                Comment.update({ CommentText: req.body.CommentText }, { where: { CommentId: paramsId } })
                    .then(() => res.status(201).json({ message: "Commentaire mis à jour !" }))
                    .catch((error) => res.status(404).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;
    const adminId = process.env.ADMINID; // comment définir autrement le adminId

    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Comment.findOne({ where: { CommentId: paramsId } })
        .then((share) => {
            if (!share.userUserId == loggedUserId || !loggedUserId == adminId) {
                res.status(400).json({
                    error: "Vous n'avez pas les autorisations nécéssaires pour effacer ce commentaire.",
                });
            } else {
                Comment.destroy({ where: { CommentId: paramsId } })
                    .then(() => res.status(201).json({ message: "Commentaire effacé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getOneComment = (req, res) => {
    const paramsId = req.params.id; // à priori ce devrait être le bon paramètre, à ajuster avec le front

    Comment.findOne({ where: { CommentId: paramsId } })
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
