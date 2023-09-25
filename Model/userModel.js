const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User must have Email'],
    },
    password: {
        type: String,
        required: [true, 'User must have Password'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
