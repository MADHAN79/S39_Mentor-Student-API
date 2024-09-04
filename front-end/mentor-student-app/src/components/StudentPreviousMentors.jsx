import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentPreviousMentors = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [previousMentors, setPreviousMentors] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('/api/students');
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchPreviousMentors = async () => {
            if (selectedStudent) {
                const response = await axios.get(`/api/students/${selectedStudent}/previous-mentors`);
                setPreviousMentors(response.data.previousMentors);
            }
        };
        fetchPreviousMentors();
    }, [selectedStudent]);

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Previous Mentors of Student</h2>
            <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">Select Student</option>
                {students.map((student) => (
                    <option key={student._id} value={student._id}>
                        {student.name}
                    </option>
                ))}
            </select>
            <ul className="list-disc pl-5">
                {previousMentors.map((mentor) => (
                    <li key={mentor._id} className="mb-2">
                        {mentor.name} - {mentor.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentPreviousMentors;
