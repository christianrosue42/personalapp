// Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors'); // import cors for cross-origin resource sharing since frontend and backend are on different ports

// Load environment variables from the .env file
//require('dotenv').config();

// Create a router object to define routes
const router = express.Router();

// Use body-parser middleware to parse incoming request bodies
router.use(bodyParser.json());

// Use cors middleware to enable cross-origin resource sharing
router.use(cors());

// Configure the AWS SDK
/* check if setting the AWS credentials is necessary since we created the IAM role with the necessary permissions
AWS.config.update({
    region: process.env.AWS_REGION,
    // AWS access key and secret key
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Check if environment variables are set
if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('ERROR: Missing one or more environment variables (AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).');
    process.exit(1);
}
*/

// Create a DynamoDB document client object
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

// Create a route that handles POST requests to '/user-list'
router.post('/create-user', (req, res) => {
    // Create a new employee object with the data from the request body
    const newEmployee = req.body;

    // Log the new employee object for debugging
    console.log(newEmployee);

    // Create a params object for the DynamoDB put method
    const params = {
        TableName: 'employees',
        Item: newEmployee
    };

      // Log the params object for debugging
    console.log("Params:", JSON.stringify(params, null, 2));

    // Use the DynamoDB document client to add the new employee to the 'employees' table
    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ err: `Could not create new employee: ${err}` });
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.status(200).json(newEmployee);
        }
    });

});

module.exports = router;