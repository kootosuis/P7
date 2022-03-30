const express = require("express");
const router = express.Router();

const auth = require("../05middleware/auth");
const multer = require("../05middleware/multer-config");
const sharesCrtl = require("../04controllers/shares");

router.post("/", auth, multer, sharesCrtl.createShare);
router.put("/:id", auth, multer, sharesCrtl.updateShare);

router.delete("/:id", auth, sharesCrtl.deleteShare);
// router.post("/:id/like", auth, sharesCrtl.likeOrDislikeShare);

router.get("/:id", auth, sharesCrtl.getOneShare);
router.get("/", auth, sharesCrtl.getAllShare);

module.exports = router;

// je mets des auth partout parce que cela doit rester un réseau interne à l'entreprise