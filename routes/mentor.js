const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a new Mentor
router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;
        const mentor = new Mentor({ name });
        await mentor.save();
        res.status(201).json(mentor);
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

        for (const studentId of studentIds) {
            const student = await Student.findById(studentId);
            if (student && !student.mentor) {
                student.mentor = mentorId;
                student.previousMentors.push(mentorId);
                await student.save();
                mentor.students.push(studentId);
            }
        }
        await mentor.save();
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
