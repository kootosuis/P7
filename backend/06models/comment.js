const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Comment = sequelize.define("comment", {
    // attributes
    COMMENT_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    COMMENT_texte: { type: Sequelize.STRING, allowNull: false },
    //     COMMENT_date: { type: Sequelize.NOW, allowNull: false }, pas utile puisqu'attrubué par défaut
    //     COMMENT_1_id: { type: Sequelize.INTEGER },
    //     UTILISATEUR_id: { type: Sequelize.INTEGER, allowNull: false },
    //     SHARE_id: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = Comment;
