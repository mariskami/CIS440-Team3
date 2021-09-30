// Pages for redirecting

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/helperlist', (req, res) => {
    res.render('helperlist');
});

router.get('/chat', (req, res) => {
    res.render('chat');
});

module.exports = router;