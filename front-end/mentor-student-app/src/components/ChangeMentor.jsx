import { useState, useEffect } from 'react';
import axios from 'axios';

const ChangeMentor = () => {
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [newMentor, setNewMentor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const studentRes = await axios.get('/api/students');
            const mentorRes = await axios.get('/api/mentors');
            setStudents(studentRes.data);
            setMentors(mentorRes.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/students/${selectedStudent}/change-mentor`, { newMentorId: newMentor });
            console.log('Mentor changed:', response.data);
        } catch (error) {
            console.error('Error changing mentor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Change Mentor for Student</h2>
            <select
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select Student</option>
                {students.map(student => (
                    <option key={student._id} value={student._id}>{student.name}</option>
                ))}
            </select>
            <select
                value={newMentor}
                onChange={e => setNewMentor(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select New Mentor</option>
                {mentors.map(mentor => (
                    <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
                ))}
            </select>
            <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded">
                Change Mentor
            </button>
        </form>
    );
};

export default ChangeMentor;

