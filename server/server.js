// imports the Express.js module and creates an instance of an Express.js application.
var express = require('express'); 
var app = express();

// imports the cors module for enabling Cross-Origin Resource Sharing (CORS) in the Express.js application.
var cors = require('cors');

// Eine Referenz zu der Datei im controllers-Ordner
//var apiController = require('./controllers/apiController');
//var mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

app.use(cors())

//mongoose.connect(process.env.DB_URL);

// process.env.PORT || 3000 erlaubt uns, den Port als Environment-Variable einzureichen. Wenn kein Port eingereicht wird, wird der Port 3000 verwendet
var port  = process.env.PORT || 3000;

// Initalizierung des appController und Übergabe von app- und cache-Instanzen
//apiController(app);

// Die API wird am definierten Port gestartet
app.listen(port);