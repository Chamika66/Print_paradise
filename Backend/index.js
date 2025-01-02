const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Atlas connection string (replace <username>, <password>, and <dbname>)
const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI, { dbName: 'print_paradise',useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a schema for the user
const userSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: { type: Date, default: Date.now }
});

// Define a model for the user
const Comment = mongoose.model('Comment', userSchema);

// POST route to save form data
app.post('/submit', async (req, res) => {
    const { name, comment } = req.body;

    try {
        const user = new Comment({ name, comment });
        await user.save();
        res.send('Data saved successfully to MongoDB!');
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
    }
});

// API route to fetch all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();  // Fetch all comments from the database
        res.json(comments);  // Send comments as JSON
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).send('Error fetching comments');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
