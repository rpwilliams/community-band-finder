const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BandSchema = new Schema({
	bandName: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	country: {type: String, required: true},
	contactName: {type: String, required: false},
	lat: {type: Number, required: true},
	lng: {type: Number, required: true},
	email: {type: String, required: true},
	homepage: {type: String, required: true}
});

module.exports = mongoose.model('Band', BandSchema);