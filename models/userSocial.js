const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSocialSchema = new Schema (
    {
        id: { type: String },
        nome: { type: String },
        status: { type: String }
    }
);
/*
UserSocialSchema.virtual('url').get(function () {
    return '/users/user/' + this._id;
});
*/

module.exports = mongoose.model('UserSocial', UserSocialSchema);