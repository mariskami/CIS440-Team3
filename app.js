const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'})

const app = express();

// Create connection with database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Defining public directory for front end things
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Paese JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("MySQL Connected...")
    }
})

// Define Routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on Port 5000");
})