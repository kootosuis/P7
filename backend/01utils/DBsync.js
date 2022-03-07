const sequelize = require("../01utils/DBconnect");

const User = require("../06models/user");
const Share = require("../06models/share");
const Comment = require("../06models/comment");
const Media = require("../06models/media");

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Share);
Share.belongsTo(User);

Share.hasMany(Comment);
Comment.belongsTo(Share);

Comment.hasMany(Comment);

Share.hasOne(Media);
Media.belongsTo(Share);
// Media.belongsTo(Share); à étudier

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

//------------remise à zéro
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
