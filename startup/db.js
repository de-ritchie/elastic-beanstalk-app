const { MongoClient } = require('mongodb');
const TestDAO = require('../dao/testDAO');

const proto = 'mongodb+srv://'
const userPass = process.env.DB_USER+':'+process.env.DB_PASS;
const host = `@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;

let promise = new Promise((resolve, reject) => {
    MongoClient.connect(proto+userPass+host, {
        useNewUrlParser: true,
        poolSize: 50,
        wtimeout: 2500,
        useUnifiedTopology: true
    })
    .then(async client => {
        try {
            await TestDAO.injectDB(client);
            resolve();
        } catch (err) {
            console.log('Error occurred while connecting to collection');
            reject(err);
        }
    })
    .catch(err => {
        console.log('Errrr occurred while connecting to DB', err.stack);
        reject(err);
    });
});

module.exports = promise;