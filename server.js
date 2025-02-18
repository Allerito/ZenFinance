require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connecting to database
mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error', (error) => console.log('Connection error'));
db.once('open', () => console.log('Connected to Database'));

// Setting up Express.js
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');

// Page render
app.get('/', (req, res) => {
    res.render('index', {name: 'MIMMA'});
})

app.get('/sign', (req, res) => {
    res.render('sign');
})

// Setting up routers
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Starting server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));