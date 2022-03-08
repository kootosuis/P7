const express = require("express");
const userCtrl = require("../04controllers/user");
const auth = require("../05middleware/auth");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/modifySignup", auth, userCtrl.modifySignup);
router.delete("/delete", auth, userCtrl.delete);

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;

// je mets des auth partout parce que cela doit rester un réseau interne à l'entreprise
