const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create multiple students
router.post('/create-many', async (req, res) => {
    try {
        const students = req.body; // Expecting an array of student objects
        if (!Array.isArray(students)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }
        const createdStudents = await Student.insertMany(students);
        res.status(201).json(createdStudents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign Mentor for multiple students
router.post('/assign-mentors', async (req, res) => {
    try {
        const { studentMentorAssignments } = req.body; // Array of { studentId, mentorId }
        if (!Array.isArray(studentMentorAssignments)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const updates = studentMentorAssignments.map(async assignment => {
            const { studentId, mentorId } = assignment;
            const student = await Student.findById(studentId);
            const mentor = await Mentor.findById(mentorId);

            if (!student) return { error: `Student ${studentId} not found` };
            if (!mentor) return { error: `Mentor ${mentorId} not found` };

            if (student.mentor) {
                const previousMentor = await Mentor.findById(student.mentor);
                previousMentor.students.pull(studentId);
                await previousMentor.save();
            }

            student.mentor = mentorId;
            student.previousMentors.push(mentorId);
            await student.save();

            mentor.students.push(studentId);
            await mentor.save();

            return { success: `Student ${studentId} assigned to Mentor ${mentorId}` };
        });

        const results = await Promise.all(updates);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to change the mentor for a student
router.put('/students/:studentId/change-mentor', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { newMentorId } = req.body;

        // Find the student
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Find the new mentor
        const newMentor = await Mentor.findById(newMentorId);
        if (!newMentor) {
            return res.status(404).json({ error: "New mentor not found" });
        }

        // Add the current mentor to the previousMentors list if exists
        if (student.mentor) {
            student.previousMentors.push(student.mentor);

            // Remove the student from the current mentor's student list
            const currentMentor = await Mentor.findById(student.mentor);
            if (currentMentor) {
                currentMentor.students.pull(studentId);
                await currentMentor.save();
            }
        }

        // Update the student's mentor to the new mentor
        student.mentor = newMentorId;
        await student.save();

        // Add the student to the new mentor's student list
        newMentor.students.push(studentId);
        await newMentor.save();

        res.status(200).json({ message: "Mentor changed successfully", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get previously assigned mentors for multiple students
router.post('/previous-mentors', async (req, res) => {
    try {
        const { studentIds } = req.body; // Array of student IDs
        if (!Array.isArray(studentIds)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const students = await Student.find({ '_id': { $in: studentIds } }).populate('previousMentors');
        if (!students) return res.status(404).json({ error: 'Students not found' });

        const result = students.map(student => ({
            studentId: student._id,
            previousMentors: student.previousMentors
        }));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
