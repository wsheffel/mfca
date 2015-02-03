'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Energycost = mongoose.model('Energycost'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, energycost;

/**
 * Energycost routes tests
 */
describe('Energycost CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Energycost
		user.save(function() {
			energycost = {
				name: 'Energycost Name'
			};

			done();
		});
	});

	it('should be able to save Energycost instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Energycost
				agent.post('/energycosts')
					.send(energycost)
					.expect(200)
					.end(function(energycostSaveErr, energycostSaveRes) {
						// Handle Energycost save error
						if (energycostSaveErr) done(energycostSaveErr);

						// Get a list of Energycosts
						agent.get('/energycosts')
							.end(function(energycostsGetErr, energycostsGetRes) {
								// Handle Energycost save error
								if (energycostsGetErr) done(energycostsGetErr);

								// Get Energycosts list
								var energycosts = energycostsGetRes.body;

								// Set assertions
								(energycosts[0].user._id).should.equal(userId);
								(energycosts[0].name).should.match('Energycost Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Energycost instance if not logged in', function(done) {
		agent.post('/energycosts')
			.send(energycost)
			.expect(401)
			.end(function(energycostSaveErr, energycostSaveRes) {
				// Call the assertion callback
				done(energycostSaveErr);
			});
	});

	it('should not be able to save Energycost instance if no name is provided', function(done) {
		// Invalidate name field
		energycost.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Energycost
				agent.post('/energycosts')
					.send(energycost)
					.expect(400)
					.end(function(energycostSaveErr, energycostSaveRes) {
						// Set message assertion
						(energycostSaveRes.body.message).should.match('Please fill Energycost name');
						
						// Handle Energycost save error
						done(energycostSaveErr);
					});
			});
	});

	it('should be able to update Energycost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Energycost
				agent.post('/energycosts')
					.send(energycost)
					.expect(200)
					.end(function(energycostSaveErr, energycostSaveRes) {
						// Handle Energycost save error
						if (energycostSaveErr) done(energycostSaveErr);

						// Update Energycost name
						energycost.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Energycost
						agent.put('/energycosts/' + energycostSaveRes.body._id)
							.send(energycost)
							.expect(200)
							.end(function(energycostUpdateErr, energycostUpdateRes) {
								// Handle Energycost update error
								if (energycostUpdateErr) done(energycostUpdateErr);

								// Set assertions
								(energycostUpdateRes.body._id).should.equal(energycostSaveRes.body._id);
								(energycostUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Energycosts if not signed in', function(done) {
		// Create new Energycost model instance
		var energycostObj = new Energycost(energycost);

		// Save the Energycost
		energycostObj.save(function() {
			// Request Energycosts
			request(app).get('/energycosts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Energycost if not signed in', function(done) {
		// Create new Energycost model instance
		var energycostObj = new Energycost(energycost);

		// Save the Energycost
		energycostObj.save(function() {
			request(app).get('/energycosts/' + energycostObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', energycost.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Energycost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Energycost
				agent.post('/energycosts')
					.send(energycost)
					.expect(200)
					.end(function(energycostSaveErr, energycostSaveRes) {
						// Handle Energycost save error
						if (energycostSaveErr) done(energycostSaveErr);

						// Delete existing Energycost
						agent.delete('/energycosts/' + energycostSaveRes.body._id)
							.send(energycost)
							.expect(200)
							.end(function(energycostDeleteErr, energycostDeleteRes) {
								// Handle Energycost error error
								if (energycostDeleteErr) done(energycostDeleteErr);

								// Set assertions
								(energycostDeleteRes.body._id).should.equal(energycostSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Energycost instance if not signed in', function(done) {
		// Set Energycost user 
		energycost.user = user;

		// Create new Energycost model instance
		var energycostObj = new Energycost(energycost);

		// Save the Energycost
		energycostObj.save(function() {
			// Try deleting Energycost
			request(app).delete('/energycosts/' + energycostObj._id)
			.expect(401)
			.end(function(energycostDeleteErr, energycostDeleteRes) {
				// Set message assertion
				(energycostDeleteRes.body.message).should.match('User is not logged in');

				// Handle Energycost error error
				done(energycostDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Energycost.remove().exec();
		done();
	});
});