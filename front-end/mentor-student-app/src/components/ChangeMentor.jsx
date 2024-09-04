import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const ChangeMentor = () => {
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentRes = await api.get('/students');
                const mentorRes = await api.get('/mentors');
                setStudents(studentRes.data);
                setMentors(mentorRes.data);
            } catch (err) {
                setError('Error fetching data: ' + err.message);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/students/${selectedStudent}/change-mentor`, { newMentorId: selectedMentor });
            setSuccess('Mentor changed successfully');
            setError('');
        } catch (err) {
            setError('Error changing mentor: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Change Mentor for a Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="border p-2"
                        required
                    >
                        <option value="">Select a student</option>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>{student.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Select New Mentor:</label>
                    <select
                        value={selectedMentor}
                        onChange={(e) => setSelectedMentor(e.target.value)}
                        className="border p-2"
                        required
                    >
                        <option value="">Select a mentor</option>
                        {mentors.map(mentor => (
                            <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Change Mentor</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default ChangeMentor;

