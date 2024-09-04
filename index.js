const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

const app = express();


// Use CORS to allow requests from your front-end
app.use(cors({
    origin: 'https://assign-mentor-nksi.onrender.com/',  // Replace with your front-end origin
    credentials: true,  // If you need to allow credentials (like cookies or authentication headers)
}));
// Other middleware
app.use(express.json());


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));

// Routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);
