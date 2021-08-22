const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserGSchema = new Schema (
    {
        idG: { type: String },
        nomeG: { type: String },
        status: { type: String }
    }
);
/*
UserGSchema.virtual('url').get(function () {
    return '/users/user/' + this._id;
});
*/

module.exports = mongoose.model('UserG', UserGSchema);  
