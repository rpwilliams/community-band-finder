const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const band = require('./routes/band.route');
const app = express();

/* Set up MongoDB connection */
let dev_db_url = 'mongodb://rpwilliams96:mamallama99@ds123003.mlab.com:23003/community-band-finder';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/bands', band);

let port = 1234;

app.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});