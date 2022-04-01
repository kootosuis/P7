const multer = require("multer");
const path = require("path");

// https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/tiff": "tiff",
    // "application/pdf": "pdf",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "07media");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

// single("image") indique seuls les téléchargements de fichiers image sont gérés.
//  La clé limits limite la taille de l'image

module.exports = multer({
    storage: storage,
    limits: { fileSize: 8000000 },
    fileFilter: function (req, file, callback) {
        const extension = MIME_TYPES[file.mimetype];
        if (
            extension !== "png" && //
            extension !== "jpg" && //
            extension !== "gif" && //
            extension !== "tiff" 
            // && //
            // extension !== "pdf"
        ) {
            return callback(new Error(".png, .tiff, .gif et .jpg seulement")); //.pdf 
        }
        callback(null, true);
    },
}).single("file");
