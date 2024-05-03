// Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

// Create an Express application
const app = express();

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Configure the AWS SDK
AWS.config.update({
    region: env.AWS_REGION,
    // AWS access key and secret key
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

// Create a DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

// Create a route that handles POST requests to '/employees'
app.post('/employees', (req, res) => {
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

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

