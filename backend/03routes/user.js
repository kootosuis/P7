const express = require("express");
const userCtrl = require("../04controllers/user");
const auth = require("../05middleware/auth");
const authAdmin = require("../05middleware/authAdmin");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/modifySignup/:id", auth, userCtrl.modifySignup);
router.delete("/delete/:id", auth, userCtrl.delete);


router.get("/safeAdmin", auth, userCtrl.getAdmins);
// router.get("/safeAdmin",authAdmin, auth, userCtrl.getAdmins);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", authAdmin, auth, userCtrl.getAllUsers);

module.exports = router;
