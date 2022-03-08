const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const User = sequelize.define("user", {
    USER_id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
    USER_name: { type: Sequelize.STRING, allowNull: false },
    USER_firstname: { type: Sequelize.STRING, allowNull: false },
    USER_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { args: true, msg: "Email invalide ou déjà utilisé." },
        },
    },
    USER_departement: { type: Sequelize.STRING, allowNull: false },
    USER_role: { type: Sequelize.STRING },
    USER_password: {
        type: Sequelize.STRING,
        allowNull: false,
        // pas d'autres contraintes ici, cela limiterait le hash (cf /04controllers/user/signup)

        // POSSIBLE DE FAIRE AUSSI AINSI (vu dans manuel sequelize : setters  , à developper)
        // mais je me demande s'il ne vaut pas mieux laisser le modèle être le modèle
        // le controller se chargeant de lui fournir les données...
        // set(value) {
        //     // Storing passwords in plaintext in the database is terrible.
        //     // Hashing the value with an appropriate cryptographic hash function is better.
        //     this.setDataValue('USER_password', hash(value,10));
        //   }
    },
});

module.exports = User;
