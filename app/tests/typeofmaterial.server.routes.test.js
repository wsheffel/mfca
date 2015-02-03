'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Typeofmaterial = mongoose.model('Typeofmaterial'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, typeofmaterial;

/**
 * Typeofmaterial routes tests
 */
describe('Typeofmaterial CRUD tests', function() {
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

		// Save a user to the test db and create new Typeofmaterial
		user.save(function() {
			typeofmaterial = {
				name: 'Typeofmaterial Name'
			};

			done();
		});
	});

	it('should be able to save Typeofmaterial instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typeofmaterial
				agent.post('/typeofmaterials')
					.send(typeofmaterial)
					.expect(200)
					.end(function(typeofmaterialSaveErr, typeofmaterialSaveRes) {
						// Handle Typeofmaterial save error
						if (typeofmaterialSaveErr) done(typeofmaterialSaveErr);

						// Get a list of Typeofmaterials
						agent.get('/typeofmaterials')
							.end(function(typeofmaterialsGetErr, typeofmaterialsGetRes) {
								// Handle Typeofmaterial save error
								if (typeofmaterialsGetErr) done(typeofmaterialsGetErr);

								// Get Typeofmaterials list
								var typeofmaterials = typeofmaterialsGetRes.body;

								// Set assertions
								(typeofmaterials[0].user._id).should.equal(userId);
								(typeofmaterials[0].name).should.match('Typeofmaterial Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Typeofmaterial instance if not logged in', function(done) {
		agent.post('/typeofmaterials')
			.send(typeofmaterial)
			.expect(401)
			.end(function(typeofmaterialSaveErr, typeofmaterialSaveRes) {
				// Call the assertion callback
				done(typeofmaterialSaveErr);
			});
	});

	it('should not be able to save Typeofmaterial instance if no name is provided', function(done) {
		// Invalidate name field
		typeofmaterial.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typeofmaterial
				agent.post('/typeofmaterials')
					.send(typeofmaterial)
					.expect(400)
					.end(function(typeofmaterialSaveErr, typeofmaterialSaveRes) {
						// Set message assertion
						(typeofmaterialSaveRes.body.message).should.match('Please fill Typeofmaterial name');
						
						// Handle Typeofmaterial save error
						done(typeofmaterialSaveErr);
					});
			});
	});

	it('should be able to update Typeofmaterial instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typeofmaterial
				agent.post('/typeofmaterials')
					.send(typeofmaterial)
					.expect(200)
					.end(function(typeofmaterialSaveErr, typeofmaterialSaveRes) {
						// Handle Typeofmaterial save error
						if (typeofmaterialSaveErr) done(typeofmaterialSaveErr);

						// Update Typeofmaterial name
						typeofmaterial.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Typeofmaterial
						agent.put('/typeofmaterials/' + typeofmaterialSaveRes.body._id)
							.send(typeofmaterial)
							.expect(200)
							.end(function(typeofmaterialUpdateErr, typeofmaterialUpdateRes) {
								// Handle Typeofmaterial update error
								if (typeofmaterialUpdateErr) done(typeofmaterialUpdateErr);

								// Set assertions
								(typeofmaterialUpdateRes.body._id).should.equal(typeofmaterialSaveRes.body._id);
								(typeofmaterialUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Typeofmaterials if not signed in', function(done) {
		// Create new Typeofmaterial model instance
		var typeofmaterialObj = new Typeofmaterial(typeofmaterial);

		// Save the Typeofmaterial
		typeofmaterialObj.save(function() {
			// Request Typeofmaterials
			request(app).get('/typeofmaterials')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Typeofmaterial if not signed in', function(done) {
		// Create new Typeofmaterial model instance
		var typeofmaterialObj = new Typeofmaterial(typeofmaterial);

		// Save the Typeofmaterial
		typeofmaterialObj.save(function() {
			request(app).get('/typeofmaterials/' + typeofmaterialObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', typeofmaterial.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Typeofmaterial instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typeofmaterial
				agent.post('/typeofmaterials')
					.send(typeofmaterial)
					.expect(200)
					.end(function(typeofmaterialSaveErr, typeofmaterialSaveRes) {
						// Handle Typeofmaterial save error
						if (typeofmaterialSaveErr) done(typeofmaterialSaveErr);

						// Delete existing Typeofmaterial
						agent.delete('/typeofmaterials/' + typeofmaterialSaveRes.body._id)
							.send(typeofmaterial)
							.expect(200)
							.end(function(typeofmaterialDeleteErr, typeofmaterialDeleteRes) {
								// Handle Typeofmaterial error error
								if (typeofmaterialDeleteErr) done(typeofmaterialDeleteErr);

								// Set assertions
								(typeofmaterialDeleteRes.body._id).should.equal(typeofmaterialSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Typeofmaterial instance if not signed in', function(done) {
		// Set Typeofmaterial user 
		typeofmaterial.user = user;

		// Create new Typeofmaterial model instance
		var typeofmaterialObj = new Typeofmaterial(typeofmaterial);

		// Save the Typeofmaterial
		typeofmaterialObj.save(function() {
			// Try deleting Typeofmaterial
			request(app).delete('/typeofmaterials/' + typeofmaterialObj._id)
			.expect(401)
			.end(function(typeofmaterialDeleteErr, typeofmaterialDeleteRes) {
				// Set message assertion
				(typeofmaterialDeleteRes.body.message).should.match('User is not logged in');

				// Handle Typeofmaterial error error
				done(typeofmaterialDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Typeofmaterial.remove().exec();
		done();
	});
});