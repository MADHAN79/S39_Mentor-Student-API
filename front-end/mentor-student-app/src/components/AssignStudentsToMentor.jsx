import { useState, useEffect } from 'react';
import axios from 'axios';

const AssignStudentsToMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const mentorRes = await axios.get('/api/mentors');
            const studentRes = await axios.get('/api/students');
            setMentors(mentorRes.data);
            setStudents(studentRes.data.filter(student => !student.mentor));
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students/assign-mentors', {
                studentMentorAssignments: selectedStudents.map(studentId => ({
                    studentId,
                    mentorId: selectedMentor
                }))
            });
            console.log('Students assigned:', response.data);
        } catch (error) {
            console.error('Error assigning students:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Assign Students to Mentor</h2>
            <select
                value={selectedMentor}
                onChange={e => setSelectedMentor(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select Mentor</option>
                {mentors.map(mentor => (
                    <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
                ))}
            </select>
            <select
                multiple
                value={selectedStudents}
                onChange={e => setSelectedStudents([...e.target.selectedOptions].map(o => o.value))}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                {students.map(student => (
                    <option key={student._id} value={student._id}>{student.name}</option>
                ))}
            </select>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                Assign Students
            </button>
        </form>
    );
};

export default AssignStudentsToMentor;
