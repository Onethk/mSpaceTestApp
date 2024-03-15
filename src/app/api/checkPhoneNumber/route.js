// server.js (Backend API)

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to SQLite3 database
const db = new sqlite3.Database('your_database.db');

// Endpoint to validate if phone number exists
app.get('/api/checkPhoneNumber/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Query the database to check if the phone number exists
    db.get('SELECT * FROM your_table WHERE phoneNumber = ?', [phoneNumber], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (row) {
                // Phone number exists
                res.status(400).json({ error: 'Phone number already exists' });
            } else {
                // Phone number does not exist
                res.status(200).json({ message: 'Phone number does not exist' });
            }
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
