const express = require("express");
// const checkPassword = require("../05middleware/checkPassword");
const userCtrl = require("../04controllers/user");

const router = express.Router();

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);
router.put("/update", userCtrl.modifySignup);
router.delete("/delete", userCtrl.delete);


//je me demande s'il ne faudrait pas ajouter des routes pour lister les users ou trouver un user

module.exports = router;
