import { useState, useEffect } from 'react';
import axios from 'axios';

const MentorStudentsList = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            const response = await axios.get('/api/mentors');
            setMentors(response.data);
        };
        fetchMentors();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedMentor) {
                const response = await axios.get(`/api/mentors/${selectedMentor}/students`);
                setStudents(response.data.students);
            }
        };
        fetchStudents();
    }, [selectedMentor]);

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Students Assigned to Mentor</h2>
            <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select Mentor</option>
                {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor._id}>
                        {mentor.name}
                    </option>
                ))}
            </select>
            <ul className="list-disc pl-5">
                {students.map((student) => (
                    <li key={student._id} className="mb-2">
                        {student.name} - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorStudentsList;
