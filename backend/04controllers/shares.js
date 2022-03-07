const User = require("../06models/user");
const Share = require("../06models/share");
const fs = require('fs');

// router.post("/", auth, multer, sharesCrtl.createShare);
// router.put("/:id", auth, multer, sharesCrtl.updateShare);
// router.delete("/:id", auth, sharesCrtl.deleteShare);
// router.post("/:id/like", auth, sharesCrtl.likeOrDislikeShare);
// router.get("/:id", auth, sharesCrtl.getOneShare);
// router.get("/", auth, sharesCrtl.getAllShare);

// D0NT'FORGET TO SET UP MULTER 

exports.createShare = (req, res) => {
// recevoir la requete
// identifier le user et récupere son id
// reperer s'il y a un media ou non
// si oui créer la ligne dans media
// Media.create
// récuperer id du media

          Share.create({
                    SHARE_text: req.body.SHARE_text,
                    //userUSER_id
                    //mediumMEDIA_id
                })
                    .then(() => res.status(201).json({ message: "Post publié !" }))
                    .catch((error) => res.status(400).json({ error }));

};
exports.updateShare = (req, res) =>{

};
exports.deleteShare = (req, res) =>{

};
// exports.likeOrDislikeShare = (req, res) =>{
// PROJET A COMPLETER
// };
exports.getOneShare = (req, res) =>{

};
exports.getAllShare = (req, res) =>{

};

