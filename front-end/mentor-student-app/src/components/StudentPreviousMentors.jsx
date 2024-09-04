import { useState } from 'react';
import api from '../api/axios';

const StudentPreviousMentors = () => {
    const [studentId, setStudentId] = useState('');
    const [previousMentors, setPreviousMentors] = useState([]);
    const [error, setError] = useState('');

    const fetchPreviousMentors = async () => {
        try {
            const response = await api.get(`/students/${studentId}/previous-mentors`);
            setPreviousMentors(response.data.previousMentors);
            setError('');
        } catch (err) {
            setError('Error fetching previous mentors: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Previous Mentors for a Student</h2>
            <div className="space-y-4">
                <div>
                    <label className="block">Select Student:</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={fetchPreviousMentors} className="bg-blue-500 text-white p-2">Get Previous Mentors</button>
                </div>
                {previousMentors.length > 0 && (
                    <ul className="list-disc pl-5">
                        {previousMentors.map(mentor => (
                            <li key={mentor._id}>{mentor.name}</li>
                        ))}
                    </ul>
                )}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default StudentPreviousMentors;
