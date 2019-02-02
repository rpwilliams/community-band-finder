const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const about = require('./routes/about.route');
const search = require('./routes/search.route');
const index  = require('./routes/main-page.route');
const app = express();

/* Set up MongoDB connection */
let dev_db_url = 'mongodb://rpwilliams96:mamallama99@ds123003.mlab.com:23003/community-band-finder';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/public'))); // Give location of static files

/* Middleware Routes */
app.use('/about', about);
app.use('/', index);
app.use('/search/', search);

app.get('/test', function (req, res) {
    res.render('about');
})


let port = 8080;

app.listen(process.env.PORT || port, () => {
	console.log('Server is up and running on port ' + port);
});