'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Materialloss = mongoose.model('Materialloss'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, materialloss;

/**
 * Materialloss routes tests
 */
describe('Materialloss CRUD tests', function() {
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

		// Save a user to the test db and create new Materialloss
		user.save(function() {
			materialloss = {
				name: 'Materialloss Name'
			};

			done();
		});
	});

	it('should be able to save Materialloss instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materialloss
				agent.post('/materiallosses')
					.send(materialloss)
					.expect(200)
					.end(function(materiallossSaveErr, materiallossSaveRes) {
						// Handle Materialloss save error
						if (materiallossSaveErr) done(materiallossSaveErr);

						// Get a list of Materiallosses
						agent.get('/materiallosses')
							.end(function(materiallossesGetErr, materiallossesGetRes) {
								// Handle Materialloss save error
								if (materiallossesGetErr) done(materiallossesGetErr);

								// Get Materiallosses list
								var materiallosses = materiallossesGetRes.body;

								// Set assertions
								(materiallosses[0].user._id).should.equal(userId);
								(materiallosses[0].name).should.match('Materialloss Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Materialloss instance if not logged in', function(done) {
		agent.post('/materiallosses')
			.send(materialloss)
			.expect(401)
			.end(function(materiallossSaveErr, materiallossSaveRes) {
				// Call the assertion callback
				done(materiallossSaveErr);
			});
	});

	it('should not be able to save Materialloss instance if no name is provided', function(done) {
		// Invalidate name field
		materialloss.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materialloss
				agent.post('/materiallosses')
					.send(materialloss)
					.expect(400)
					.end(function(materiallossSaveErr, materiallossSaveRes) {
						// Set message assertion
						(materiallossSaveRes.body.message).should.match('Please fill Materialloss name');
						
						// Handle Materialloss save error
						done(materiallossSaveErr);
					});
			});
	});

	it('should be able to update Materialloss instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materialloss
				agent.post('/materiallosses')
					.send(materialloss)
					.expect(200)
					.end(function(materiallossSaveErr, materiallossSaveRes) {
						// Handle Materialloss save error
						if (materiallossSaveErr) done(materiallossSaveErr);

						// Update Materialloss name
						materialloss.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Materialloss
						agent.put('/materiallosses/' + materiallossSaveRes.body._id)
							.send(materialloss)
							.expect(200)
							.end(function(materiallossUpdateErr, materiallossUpdateRes) {
								// Handle Materialloss update error
								if (materiallossUpdateErr) done(materiallossUpdateErr);

								// Set assertions
								(materiallossUpdateRes.body._id).should.equal(materiallossSaveRes.body._id);
								(materiallossUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Materiallosses if not signed in', function(done) {
		// Create new Materialloss model instance
		var materiallossObj = new Materialloss(materialloss);

		// Save the Materialloss
		materiallossObj.save(function() {
			// Request Materiallosses
			request(app).get('/materiallosses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Materialloss if not signed in', function(done) {
		// Create new Materialloss model instance
		var materiallossObj = new Materialloss(materialloss);

		// Save the Materialloss
		materiallossObj.save(function() {
			request(app).get('/materiallosses/' + materiallossObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', materialloss.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Materialloss instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materialloss
				agent.post('/materiallosses')
					.send(materialloss)
					.expect(200)
					.end(function(materiallossSaveErr, materiallossSaveRes) {
						// Handle Materialloss save error
						if (materiallossSaveErr) done(materiallossSaveErr);

						// Delete existing Materialloss
						agent.delete('/materiallosses/' + materiallossSaveRes.body._id)
							.send(materialloss)
							.expect(200)
							.end(function(materiallossDeleteErr, materiallossDeleteRes) {
								// Handle Materialloss error error
								if (materiallossDeleteErr) done(materiallossDeleteErr);

								// Set assertions
								(materiallossDeleteRes.body._id).should.equal(materiallossSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Materialloss instance if not signed in', function(done) {
		// Set Materialloss user 
		materialloss.user = user;

		// Create new Materialloss model instance
		var materiallossObj = new Materialloss(materialloss);

		// Save the Materialloss
		materiallossObj.save(function() {
			// Try deleting Materialloss
			request(app).delete('/materiallosses/' + materiallossObj._id)
			.expect(401)
			.end(function(materiallossDeleteErr, materiallossDeleteRes) {
				// Set message assertion
				(materiallossDeleteRes.body.message).should.match('User is not logged in');

				// Handle Materialloss error error
				done(materiallossDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Materialloss.remove().exec();
		done();
	});
});