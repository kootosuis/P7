const jwt = require("jsonwebtoken");
const User = require("../06models/user");
const dotEnv = require("dotenv").config({
    path: "../.env",
});

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const loggedUserId = decodedToken.UserId;

    User.findOne({ where: { UserId: loggedUserId } })
        .then((res) => {
            if (res.UserHabilitation == 1) {
                next();
            } else {
                throw new Error(res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(error).json(error.message));
};
