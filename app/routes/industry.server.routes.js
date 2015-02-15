'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	industry = require('../../app/controllers/industry.server.controller');

module.exports = function(app) {
	// Industry Routes
	app.route('/industry')
		.get(industry.list)
		.post(users.requiresLogin, industry.create);

	app.route('/industry/:industryId')
		.get(industry.read)
		.put(users.requiresLogin, industry.hasAuthorization, industry.update)
		.delete(users.requiresLogin, industry.hasAuthorization, industry.delete);

	// Finish by binding the industry middleware
	app.param('industryId', industry.industryByID);
};