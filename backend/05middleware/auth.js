const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config({
    path: "../.env",
});

module.exports = (req, res, next) => {
    try {
        // Extraction du token du header Authorization de la requête entrante :
        // Authorization = Bearer" "token
        const token = req.headers.authorization.split(" ")[1];

        // la fonction verify décode le token
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

        // l'ID utilisateur est extrait du token ;
        const loggedUserId = decodedToken.UserId;

        // si la demande contient un ID utilisateur, on compare à celui extrait du token
        if (req.body.USER_id && req.body.USER_id !== loggedUserId) {
            throw new Error("Invalid User Id !");
        } else {
          //         console.log(loggedUserId);
          //   return loggedUserId;
          next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};