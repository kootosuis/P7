const sequelize = require("../01utils/DBconnect");
const Sequelize = require("sequelize");

const Comment = sequelize.define("comment", {
    CommentId: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    CommentText: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Comment;
