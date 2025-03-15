// Import necessary libraries
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors'); // Import CORS

// Set up an in-memory SQLite database using Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:'  // In-memory database, no need for an actual file
});

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Initialize the Express app
const app = express();
const PORT = 3003;  // Change the port to 3003

// Use CORS middleware to handle cross-origin requests (important for front-end to work)
app.use(cors());

// Define the route to fetch all users
app.get('/users', async (req, res) => {
    try {
        // Fetch all users from the SQLite database
        const users = await User.findAll();
        res.json(users);  // Return users as JSON response
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Sync the database and create the tables (in-memory SQLite)
sequelize.sync({ force: true }).then(async () => {
    // Insert some sample users into the database after syncing
    await User.create({ name: 'John Doe', email: 'john@example.com', status: 'active' });
    await User.create({ name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' });
    await User.create({ name: 'Alice Johnson', email: 'alice@example.com', status: 'active' });

    // Start the Express server after syncing
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
