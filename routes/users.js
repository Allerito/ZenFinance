const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users page');
})

router.get('/new', (req, res) => {
    res.send('New user page');
})

module.exports = router;