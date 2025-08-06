
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    accountType: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free',
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;