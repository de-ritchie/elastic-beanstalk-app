const http = require('http');

const app = require('./startup/app');
const db = require('./startup/db');

db.then(() => {
    http.createServer(app)
    .listen(process.env.PORT || 8080, () => {
        console.log('Server started at port', process.env.PORT || 8080);
    })
})