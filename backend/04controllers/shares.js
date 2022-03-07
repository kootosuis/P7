const User = require("../06models/user");
const Share = require("../06models/share");
const fs = require("fs");

// router.post("/", auth, multer, sharesCrtl.createShare);
// router.put("/:id", auth, multer, sharesCrtl.updateShare);
// router.delete("/:id", auth, sharesCrtl.deleteShare);
// router.post("/:id/like", auth, sharesCrtl.likeOrDislikeShare);
// router.get("/:id", auth, sharesCrtl.getOneShare);
// router.get("/", auth, sharesCrtl.getAllShare);

// D0NT'FORGET TO SET UP MULTER

exports.createShare = (req, res) => {
    // recevoir la requete
    // identifier le user et récuperer son id
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const loggedUserId = decodedToken.UserId;

    // reperer s'il y a un media ou non

    // si non comment se comporte multer?
    Media.create({
        MEDIA_name: req.file.filename,
        MEDIA_type: req.file.type,
        MEDIA_size: req.file.size,
        MEDIA_description: req.file.description,
    });

    // si oui créer la ligne dans media
    Media.create({
        MEDIA_name: req.file.filename,
        MEDIA_type: req.file.type,
        MEDIA_size: req.file.size,
        MEDIA_description: req.file.description,
        MEDIA_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, // à vérifier, le filename est ici fabriqué par multer
    });

    // récuperer id du media

    Media.findOne({ where: {} });

    Share.create({
        SHARE_text: req.body.SHARE_text,
        userUSER_id: loggedUserId,
        //mediumMEDIA_id
    })
        .then(() => res.status(201).json({ message: "Post publié !" }))
        .catch((error) => res.status(400).json({ error }));
};
exports.updateShare = (req, res) => {};
exports.deleteShare = (req, res) => {};
// exports.likeOrDislikeShare = (req, res) =>{
// PROJET A COMPLETER
// };
exports.getOneShare = (req, res) => {};
exports.getAllShare = (req, res) => {};
