var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');

describe('Tag', function(){
	var url = 'localhost:3000';
	
	before(function(done) {
	    // In our tests we use the test db
	    mongoose.connect('mongodb://localhost/tag_tracker');							
	    done();
	});

	describe('#create()', function() {
		it('should create a new tag', function(done) {
			var tag = {
				name: 'Mocha',
				description: 'Tag mocha test',
				minor: 1,
				major: 1,
				uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
				type: 'restaurant'
			};
			request(url)
				.post('/tags')
				.set('Content-Type', 'application/json')
				.send(tag)
				.end(function(err,res) {
					if (err) {
						throw err;
					}
					// Should.js fluent syntax applied
					//res.body.should.have.property('_id');
	                res.body.name.should.equal('Mocha');
	                res.body.minor.should.equal(1);                    
	                res.body.creationDate.should.not.equal(null);
					done();
				});
		});
	});
});

