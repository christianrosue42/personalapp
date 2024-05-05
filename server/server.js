const express = require('express');
const cors = require('cors');
const apiController = require('./controler/apiControler');

const app = express();

app.use(cors());
app.use(express.json());

// Use the routes defined in apiController
app.use('/api', apiController);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});