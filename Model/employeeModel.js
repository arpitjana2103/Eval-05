const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    department: {
        type: String,
        enum: ['Tech', 'Marketing', 'Operations'],
    },
    salary: Number,
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = {Employee};
