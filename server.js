const { name } = require('ejs');
const express = require('express');
const app = express();

const PORT = 3000;

app.set(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {name: 'John Doe'});
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(PORT);