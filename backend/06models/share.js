const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Share = sequelize.define("share", {
    // attributes
    SHARE_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    SHARE_text: { type: Sequelize.STRING, allowNull: false },
    //     SHARE_date: { type: Sequelize.NOW, allowNull: false }, pas utile puisque atrribué par défaut
    //     Id_UTILISATEUR: { type: Sequelize.INTEGER, allowNull: false },
    //     Id_MEDIA: { type: Sequelize.INTEGER, allowNull: false},
});

module.exports = Share;
