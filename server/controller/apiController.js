// Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors'); // import cors for cross-origin resource sharing since frontend and backend are on different ports

// Create a router object to define routes
const router = express.Router();

// Use body-parser middleware to parse incoming request bodies
router.use(bodyParser.json());

// Use cors middleware to enable cross-origin resource sharing
router.use(cors());

// Configure the AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION,
    // AWS access key and secret key
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create a DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

// Create a route that handles POST requests to '/user-list'
router.post('/create-user', (req, res) => {
    // Create a new employee object with the data from the request body
    const newEmployee = req.body;

    // Create a params object for the DynamoDB put method
    const params = {
        TableName: 'employees',
        Item: newEmployee
    };

    // Use the DynamoDB document client to add the new employee to the 'employees' table
    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ error: 'Could not create new employee' });
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.status(200).json(newEmployee);
        }
    });
});

module.exports = router;