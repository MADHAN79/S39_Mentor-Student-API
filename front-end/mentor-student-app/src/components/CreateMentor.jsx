import { useState } from 'react';
import api from '../api/axios';

const CreateMentor = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/mentors/create', { name, subject });
            setSuccess('Mentor created successfully');
            setError('');
            setName('');
            setSubject('');
        } catch (err) {
            setError('Error creating mentor: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Create Mentor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block">Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Create Mentor</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default CreateMentor;
