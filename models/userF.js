const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserFSchema = new Schema (
    {
        idF: { type: String },
        nomeF: { type: String },
        status: { type: String }
    }
);
/*
UserFSchema.virtual('url').get(function () {
    return '/users/user/' + this._id;
});
*/

module.exports = mongoose.model('UserF', UserFSchema);