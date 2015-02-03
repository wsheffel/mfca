'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Typeofmaterial = mongoose.model('Typeofmaterial');

/**
 * Globals
 */
var user, typeofmaterial;

/**
 * Unit tests
 */
describe('Typeofmaterial Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			typeofmaterial = new Typeofmaterial({
				name: 'Typeofmaterial Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return typeofmaterial.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			typeofmaterial.name = '';

			return typeofmaterial.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Typeofmaterial.remove().exec();
		User.remove().exec();

		done();
	});
});