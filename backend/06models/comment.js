const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Comment = sequelize.define("comment", {
    COMMENT_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    COMMENT_texte: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Comment;
