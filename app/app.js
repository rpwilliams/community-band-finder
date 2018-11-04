const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const band = require('./routes/band.route');
const index  = require('./routes/main-page.route')
const app = express();

app.set('view engine', 'ejs');

/* Set up MongoDB connection */
let dev_db_url = 'mongodb://rpwilliams96:mamallama99@ds123003.mlab.com:23003/community-band-finder';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname + '/public'))); // Give location of static files

/* Middleware Routes */
app.use('/search/', band);
app.use('/', index);

let port = 8080;

app.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});