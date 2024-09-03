const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create multiple mentors
router.post('/create-many', async (req, res) => {
    try {
        const mentors = req.body; // Expecting an array of mentor objects
        if (!Array.isArray(mentors)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }
        const createdMentors = await Mentor.insertMany(mentors);
        res.status(201).json(createdMentors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign multiple students to a mentor
router.post('/:mentorId/assign-students', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentIds } = req.body;

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

        const students = await Student.find({ '_id': { $in: studentIds } });
        students.forEach(student => {
            if (!student.mentor) {
                student.mentor = mentorId;
                student.previousMentors.push(mentorId);
                mentor.students.push(student._id);
            }
        });

        await Promise.all([mentor.save(), ...students.map(student => student.save())]);
        res.status(200).json(mentor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
        res.status(200).json(mentor.students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
