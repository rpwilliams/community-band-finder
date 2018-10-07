const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Band = new Schema({
	bandName: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	country: {type: String, required: true},
	homePage: {type: String, required: true}
});

module.exports = mongoose.model('Band', Band);