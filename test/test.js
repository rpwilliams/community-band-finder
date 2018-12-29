var assert = require('assert');
const search = require('../controllers/search.controller');
const Band = require('../models/band.model');
var chai = require('chai');
var expect = chai.expect;

describe('Unit Tests', function() {
	describe('#SearchController', function() {
		it('sortCriteria function is returning in incorrect result.', function() {
			var b1 = new Band();
			b1.distance = 10.69821;
			var b2 = new Band();
			b2.distance = 1.0191019121;

			var res = search.sortCriteria(b1, b2);
			expect(b1.distance).to.be.above(res);
		});

		it('haversineDistance function is returning an incorrect result when using miles.', function() {
			const CORRECT_RESULT = 0.341;
			assert.equal(search.haversineDistance(38.898556, -77.037852,
				38.897147, -77.043934, true).toFixed(3), CORRECT_RESULT); 
		});

		it('haversineDistance function is returning an incorrect result when using kilometers.', function() {
			const CORRECT_RESULT = 0.549;
			assert.equal(search.haversineDistance(38.898556, -77.037852,
				38.897147, -77.043934, false).toFixed(3), CORRECT_RESULT); 
		});
	});
});