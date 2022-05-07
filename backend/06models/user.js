const sequelize = require("../01utils/DBconnect");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    UserId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
    UserName: { type: Sequelize.STRING, allowNull: false },
    UserFirstname: { type: Sequelize.STRING, allowNull: false },
    UserEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { args: true, msg: "Email déjà utilisé." },
        validate: {
            isEmail: { args: true, msg: "Email invalide." },
        },
    },
    UserPresentation: { type: Sequelize.STRING },
    UserDepartement: { type: Sequelize.STRING, allowNull: false },
    UserRole: { type: Sequelize.STRING },
    UserPassword: {
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
    UserHabilitation: {
        type: Sequelize.STRING,
        allowNull: false,
        default: false,
    },
});

module.exports = User;
