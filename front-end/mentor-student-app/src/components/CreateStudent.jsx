import React, { useState } from 'react';
import api from '../api/axios';

const CreateStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/students/create', { name, age });
            setSuccess('Student created successfully');
            setError('');
            setName('');
            setAge('');
        } catch (err) {
            setError('Error creating student: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Create Student</h2>
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
                    <label className="block">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Create Student</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default CreateStudent;
