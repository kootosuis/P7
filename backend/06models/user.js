const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const User = sequelize.define("user", {
    // attributes
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
    },
});

module.exports = User;
