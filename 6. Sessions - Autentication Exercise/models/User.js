const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],  //Admin, User, Student - As Array
    rents: { type: mongoose.Types.ObjectId, ref: 'Rent' }
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);
User.seedAdmin = async () => {
    try {
        const users = await User.find();

        if (users.length > 0) { return; }
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin123');
        return User.create({
            username: 'Admin',
            hashedPass: hashedPass,
            firstName: 'Pesho',
            lastName: 'G',
            salt: salt,
            roles: ['Admin']
        });
    } catch (err) {
        console.log(err);
    }

}

module.exports = User;