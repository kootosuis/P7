const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config({
    path: "../.env",
});

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
        const loggedUserId = decodedToken.UserId;

        if (req.body.UserId && req.body.UserId !== loggedUserId) {
            throw new Error("Invalid User Id !");
        } else {
            next();
        }
    } 
    // catch {
    //     (error) => res.status(error).json(error.message );
    // }
    
    catch {
    res.status(401).json({ message: "Vous ne pouvez pas effectuer cette opération"});
    }
};
