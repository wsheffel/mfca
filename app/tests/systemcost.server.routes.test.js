'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Systemcost = mongoose.model('Systemcost'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, systemcost;

/**
 * Systemcost routes tests
 */
describe('Systemcost CRUD tests', function() {
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

		// Save a user to the test db and create new Systemcost
		user.save(function() {
			systemcost = {
				name: 'Systemcost Name'
			};

			done();
		});
	});

	it('should be able to save Systemcost instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Systemcost
				agent.post('/systemcosts')
					.send(systemcost)
					.expect(200)
					.end(function(systemcostSaveErr, systemcostSaveRes) {
						// Handle Systemcost save error
						if (systemcostSaveErr) done(systemcostSaveErr);

						// Get a list of Systemcosts
						agent.get('/systemcosts')
							.end(function(systemcostsGetErr, systemcostsGetRes) {
								// Handle Systemcost save error
								if (systemcostsGetErr) done(systemcostsGetErr);

								// Get Systemcosts list
								var systemcosts = systemcostsGetRes.body;

								// Set assertions
								(systemcosts[0].user._id).should.equal(userId);
								(systemcosts[0].name).should.match('Systemcost Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Systemcost instance if not logged in', function(done) {
		agent.post('/systemcosts')
			.send(systemcost)
			.expect(401)
			.end(function(systemcostSaveErr, systemcostSaveRes) {
				// Call the assertion callback
				done(systemcostSaveErr);
			});
	});

	it('should not be able to save Systemcost instance if no name is provided', function(done) {
		// Invalidate name field
		systemcost.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Systemcost
				agent.post('/systemcosts')
					.send(systemcost)
					.expect(400)
					.end(function(systemcostSaveErr, systemcostSaveRes) {
						// Set message assertion
						(systemcostSaveRes.body.message).should.match('Please fill Systemcost name');
						
						// Handle Systemcost save error
						done(systemcostSaveErr);
					});
			});
	});

	it('should be able to update Systemcost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Systemcost
				agent.post('/systemcosts')
					.send(systemcost)
					.expect(200)
					.end(function(systemcostSaveErr, systemcostSaveRes) {
						// Handle Systemcost save error
						if (systemcostSaveErr) done(systemcostSaveErr);

						// Update Systemcost name
						systemcost.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Systemcost
						agent.put('/systemcosts/' + systemcostSaveRes.body._id)
							.send(systemcost)
							.expect(200)
							.end(function(systemcostUpdateErr, systemcostUpdateRes) {
								// Handle Systemcost update error
								if (systemcostUpdateErr) done(systemcostUpdateErr);

								// Set assertions
								(systemcostUpdateRes.body._id).should.equal(systemcostSaveRes.body._id);
								(systemcostUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Systemcosts if not signed in', function(done) {
		// Create new Systemcost model instance
		var systemcostObj = new Systemcost(systemcost);

		// Save the Systemcost
		systemcostObj.save(function() {
			// Request Systemcosts
			request(app).get('/systemcosts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Systemcost if not signed in', function(done) {
		// Create new Systemcost model instance
		var systemcostObj = new Systemcost(systemcost);

		// Save the Systemcost
		systemcostObj.save(function() {
			request(app).get('/systemcosts/' + systemcostObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', systemcost.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Systemcost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Systemcost
				agent.post('/systemcosts')
					.send(systemcost)
					.expect(200)
					.end(function(systemcostSaveErr, systemcostSaveRes) {
						// Handle Systemcost save error
						if (systemcostSaveErr) done(systemcostSaveErr);

						// Delete existing Systemcost
						agent.delete('/systemcosts/' + systemcostSaveRes.body._id)
							.send(systemcost)
							.expect(200)
							.end(function(systemcostDeleteErr, systemcostDeleteRes) {
								// Handle Systemcost error error
								if (systemcostDeleteErr) done(systemcostDeleteErr);

								// Set assertions
								(systemcostDeleteRes.body._id).should.equal(systemcostSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Systemcost instance if not signed in', function(done) {
		// Set Systemcost user 
		systemcost.user = user;

		// Create new Systemcost model instance
		var systemcostObj = new Systemcost(systemcost);

		// Save the Systemcost
		systemcostObj.save(function() {
			// Try deleting Systemcost
			request(app).delete('/systemcosts/' + systemcostObj._id)
			.expect(401)
			.end(function(systemcostDeleteErr, systemcostDeleteRes) {
				// Set message assertion
				(systemcostDeleteRes.body.message).should.match('User is not logged in');

				// Handle Systemcost error error
				done(systemcostDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Systemcost.remove().exec();
		done();
	});
});