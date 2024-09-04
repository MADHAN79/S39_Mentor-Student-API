import { useState } from 'react';
import axios from 'axios';

const CreateMentor = () => {
    const [mentor, setMentor] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setMentor({ ...mentor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/mentors', mentor);
            console.log('Mentor created:', response.data);
        } catch (error) {
            console.error('Error creating mentor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Mentor</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={mentor.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={mentor.email}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Create Mentor
            </button>
        </form>
    );
};

export default CreateMentor;
