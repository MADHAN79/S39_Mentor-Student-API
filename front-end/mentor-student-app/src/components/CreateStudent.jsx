import { useState } from 'react';
import axios from 'axios';

const CreateStudent = () => {
    const [student, setStudent] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students', student);
            console.log('Student created:', response.data);
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Student</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={student.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Create Student
            </button>
        </form>
    );
};

export default CreateStudent;
