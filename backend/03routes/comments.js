const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCrtl = require("../controllers/comments");

router.post("/", auth, commentCrtl.createComment);
router.put("/:id", auth, commentCrtl.updateComment);
router.delete("/:id", auth, commentCrtl.deleteComment);
router.post("/:id/like", auth, commentCrtl.likeOrDislikeComment);
router.get("/:id", auth, commentCrtl.getOneComment);
router.get("/", auth, commentCrtl.getAllComment);

module.exports = router;