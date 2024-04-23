/**
 * Define the User model Schema for MongoDB
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    vorname: { type: String, required: true },
    nachname: { type: String, required: true },
    email: { type: String, required: true },
    abteilung: String,
    address: String,
    geburtstag: Date,
  });
  
const User = mongoose.model('User', userSchema);
  
module.exports = User;
