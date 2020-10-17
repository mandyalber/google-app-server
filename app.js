const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be either "rating" or "app"');
        }
    }

    let results = apps
        .filter(a => a.Genres.toLowerCase().includes(genres.toLowerCase()))

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    res.json(results);
});

module.exports = app;
