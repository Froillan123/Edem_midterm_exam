// question3.js
const express = require('express');
const app = express();
const PORT = 3002;  // Change the port to 3002

// Define the route /test
app.get('/test', (req, res) => {
    res.json({ message: 'Express is working! Write your full name' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
