const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const TestDAO = require('../dao/testDAO');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {

    TestDAO.getRecords()
    .then(result => {
        res.status(200)
        .json({
            message: 'Server is healthy',
            result
        });
    })
    .catch(err => res.status(500).json({ message: 'ISE'}));
});

app.use('**', (req, res) => res.status(404).json({ message: 'Oops! you\'re lost...'}));

module.exports = app;