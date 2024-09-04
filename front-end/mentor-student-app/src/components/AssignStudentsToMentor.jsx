import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AssignStudentsToMentor = () => {
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentRes = await api.get('/students');
                const mentorRes = await api.get('/mentors');
                setStudents(studentRes.data.filter(student => !student.mentor)); // Filter out students with mentors
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
            await api.post('/assign-mentors', { studentMentorAssignments: selectedStudents.map(studentId => ({ studentId, mentorId: selectedMentor })) });
            setSuccess('Students assigned successfully');
            setError('');
        } catch (err) {
            setError('Error assigning students: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Assign Students to Mentor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Select Mentor:</label>
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
                <div>
                    <label className="block">Select Students:</label>
                    {students.map(student => (
                        <div key={student._id}>
                            <input
                                type="checkbox"
                                value={student._id}
                                onChange={(e) => {
                                    const studentId = e.target.value;
                                    setSelectedStudents(prev => 
                                        e.target.checked 
                                            ? [...prev, studentId] 
                                            : prev.filter(id => id !== studentId)
                                    );
                                }}
                            />
                            {student.name}
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Assign Students</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default AssignStudentsToMentor;
