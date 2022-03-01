const express = require("express");
const checkPassword = require("../middleware/checkPassword");
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post("/signup", checkPassword, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("//update", userCtrl.update);
router.delete("/", userCrtl.delete);g

module.exports = router;
