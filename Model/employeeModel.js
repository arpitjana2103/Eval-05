const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    fname: String,

    lname: String,
    email: String,
    department: {
        type: String,
        enum: ['Tech', 'Marketing', 'Operations'],
    },
    salary: Number,
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = {Employee};
