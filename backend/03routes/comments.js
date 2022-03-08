const express = require("express");
const router = express.Router();

const auth = require("../05middleware/auth");
const commentsCrtl = require("../04controllers/comments");

router.post("/", auth, commentsCrtl.createComment);
router.put("/:id", auth, commentsCrtl.updateComment);
router.delete("/:id", auth, commentsCrtl.deleteComment);
// router.post("/:id/like", auth, commentsCrtl.likeOrDislikeComment);
router.get("/:id", auth, commentsCrtl.getOneComment);
router.get("/", auth, commentsCrtl.getAllComment);

module.exports = router;