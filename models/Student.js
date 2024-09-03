const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    _id: { type: String }, // Use String for _id
    name: { type: String, required: true },
    mentor: { type: String, ref: 'Mentor' }, // Adjust as needed
    previousMentors: [{ type: String, ref: 'Mentor' }]
});

module.exports = mongoose.model('Student', StudentSchema);
