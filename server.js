const { name } = require('ejs');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error', (error) => console.log('Connection error'));
db.once('open', () => console.log('Connected to Database'));

app.set(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {name: 'John Doe'});
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));