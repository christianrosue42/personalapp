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

// Create a route that handles GET requests to '/employees'
router.get('/employees', (req, res) => {
    // Create a params object for the DynamoDB scan method
    const params = {
        TableName: 'employees',
    };

    // Use the DynamoDB document client to fetch all employees from the 'employees' table
    docClient.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to fetch items. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ err: `Could not fetch employees: ${err}` });
        } else {
            console.log("Fetched items:", JSON.stringify(data, null, 2));
            res.status(200).json(data.Items);
        }
    });
});

// Create a route that handles PUT requests to '/update-user/:id'
router.put('/update-user/:id', (req, res) => {
    // Get the id from the request parameters
    const id = req.params.id.toString();

    // Get the updated user data from the request body
    const updatedUser = req.body;

    // Create a params object for the DynamoDB update method
    const params = {
        TableName: 'employees',
        Key: { id: id },
        UpdateExpression: "set #vorname = :vorname, #nachname = :nachname, #email = :email, #abteilung = :abteilung, #address = :address, #geburtstag = :geburtstag",
        ExpressionAttributeNames: {            
            "#vorname": "vorname",
            "#nachname": "nachname",
            "#email": "email",
            "#abteilung": "abteilung",
            "#address": "address",
            "#geburtstag": "geburtstag"
        },
        ExpressionAttributeValues: {            
            ":vorname": updatedUser.vorname,
            ":nachname": updatedUser.nachname,
            ":email": updatedUser.email,
            ":abteilung": updatedUser.abteilung,
            ":address": updatedUser.address,
            ":geburtstag": updatedUser.geburtstag
        },
        ReturnValues: "UPDATED_NEW"
    };

    // Use the DynamoDB document client to update the user in the 'employees' table
    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ err: `Could not update user: ${err}` });
        } else {
            console.log("Updated item:", JSON.stringify(data, null, 2));
            res.status(200).json(updatedUser);
        }
    });
});

// Create a route that handles DELETE requests to '/delete-user/:id'
router.delete('/delete-user/:id', (req, res) => {
    // Get the id from the request parameters
    const id = req.params.id.toString();

    // Create a params object for the DynamoDB delete method
    const params = {
        TableName: 'employees',
        Key: { id: id },
    };

    // Use the DynamoDB document client to delete the user from the 'employees' table
    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({ err: `Could not delete user: ${err}` });
        } else {
            console.log("Deleted item:", JSON.stringify(data, null, 2));
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});

module.exports = router;