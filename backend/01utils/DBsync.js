const sequelize = require("../01utils/DBconnect");

const User = require("../06models/user");
const Share = require("../06models/share");
const Comment = require("../06models/comment");
const Media = require("../06models/media");

User.hasMany(Comment, {
    onDelete: "cascade",
    foreignKey: {
        allowNull: false,
    },
});
Comment.belongsTo(User);

User.hasMany(Share, {
    onDelete: "cascade",
    foreignKey: {
        allowNull: false,
    },
});
Share.belongsTo(User);

Share.hasMany(Comment, {
    onDelete: "cascade",
    foreignKey: {
        allowNull: false,
    },
});
Comment.belongsTo(Share);

Comment.hasMany(Comment);

Share.hasOne(Media, {
    onDelete: "cascade",
    foreignKey: {
        allowNull: true,
    },
});

Media.belongsTo(Share);

//--------modification des colonnes
// sequelize
//     //     .sync()
//     .sync({ alter: true })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// ------------remise à zéro
// sequelize
//     //     .sync()
//     .sync({ force: true })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = sequelize.sync();
