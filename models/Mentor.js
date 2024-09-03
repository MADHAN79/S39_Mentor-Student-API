const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    _id: { type: String }, // Use String for _id
    name: { type: String, required: true },
    students: [{ type: String, ref: 'Student' }] // Adjust as needed
});

module.exports = mongoose.model('Mentor', MentorSchema);
