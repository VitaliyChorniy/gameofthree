const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const api = require('./api/api')(express);
const path = require('path');
const cors = require('cors')
const originsWhitelist = [
    'http://localhost:3232'
];
const corsOptions = {
    origin: (origin, callback) => {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // for parsing application/x-www-form-urlencoded

// Logs all requests to a console
app.use(morgan('dev'));

// All routes are here
app.use('/api', api);

app.listen('9999', (req, res) => {
    console.log(`ELP server app listening on port 9999!`);
})
