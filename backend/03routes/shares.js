const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const shareCrtl = require("../controllers/shares");

router.post("/", auth, multer, shareCrtl.createShare);
router.put("/:id", auth, multer, shareCrtl.updateShare);
router.delete("/:id", auth, shareCrtl.deleteShare);
router.post("/:id/like", auth, shareCrtl.likeOrDislikeShare);
router.get("/:id", auth, shareCrtl.getOneShare);
router.get("/", auth, shareCrtl.getAllShare);

module.exports = router;
