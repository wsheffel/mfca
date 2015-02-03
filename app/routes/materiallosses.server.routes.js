'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var materiallosses = require('../../app/controllers/materiallosses.server.controller');

	// Materiallosses Routes
	app.route('/materiallosses')
		.get(materiallosses.list)
		.post(users.requiresLogin, materiallosses.create);

	app.route('/materiallosses/:materiallossId')
		.get(materiallosses.read)
		.put(users.requiresLogin, materiallosses.hasAuthorization, materiallosses.update)
		.delete(users.requiresLogin, materiallosses.hasAuthorization, materiallosses.delete);

	// Finish by binding the Materialloss middleware
	app.param('materiallossId', materiallosses.materiallossByID);
};
