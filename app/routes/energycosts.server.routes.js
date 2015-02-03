'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var energycosts = require('../../app/controllers/energycosts.server.controller');

	// Energycosts Routes
	app.route('/energycosts')
		.get(energycosts.list)
		.post(users.requiresLogin, energycosts.create);

	app.route('/energycosts/:energycostId')
		.get(energycosts.read)
		.put(users.requiresLogin, energycosts.hasAuthorization, energycosts.update)
		.delete(users.requiresLogin, energycosts.hasAuthorization, energycosts.delete);

	// Finish by binding the Energycost middleware
	app.param('energycostId', energycosts.energycostByID);
};
