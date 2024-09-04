import { useState } from 'react';
import api from '../api/axios';

const MentorStudentsList = () => {
    const [mentorId, setMentorId] = useState('');
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await api.get(`/mentors/${mentorId}/students`);
            setStudents(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching students: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">List Students for a Mentor</h2>
            <div className="space-y-4">
                <div>
                    <label className="block">Select Mentor:</label>
                    <input
                        type="text"
                        value={mentorId}
                        onChange={(e) => setMentorId(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={fetchStudents} className="bg-blue-500 text-white p-2">Get Students</button>
                </div>
                {students.length > 0 && (
                    <ul className="list-disc pl-5">
                        {students.map(student => (
                            <li key={student._id}>{student.name}</li>
                        ))}
                    </ul>
                )}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default MentorStudentsList;
