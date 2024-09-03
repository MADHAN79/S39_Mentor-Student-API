const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create a new Student
router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;
        const student = new Student({ name });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign or Change Mentor for a student
router.post('/:studentId/assign-mentor', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;

        const student = await Student.findById(studentId);
        const mentor = await Mentor.findById(mentorId);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

        if (student.mentor) {
            // Remove student from current mentor
            const previousMentor = await Mentor.findById(student.mentor);
            previousMentor.students.pull(studentId);
            await previousMentor.save();
        }

        student.mentor = mentorId;
        student.previousMentors.push(mentorId);
        await student.save();

        mentor.students.push(studentId);
        await mentor.save();

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get previously assigned mentors for a student
router.get('/:studentId/previous-mentors', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('previousMentors');
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student.previousMentors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
