const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        nome: { type: String },
        email: { type: String },
        senha: { type: String },
        status: { type: String }
    }
);

UserSchema.virtual('url').get(function () {
    return '/users/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);