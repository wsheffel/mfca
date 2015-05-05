'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var systemcosts = require('../../app/controllers/systemcosts.server.controller');

	// Systemcosts Routes
	app.route('/systemcosts')
		.get(systemcosts.list)
		.post(users.requiresLogin, systemcosts.create);

	app.route('/systemcosts/:systemcostId')
		.get(systemcosts.read)
		.put(users.requiresLogin, systemcosts.update)
		.delete(users.requiresLogin, systemcosts.delete);

	// Finish by binding the Systemcost middleware
	app.param('systemcostId', systemcosts.systemcostByID);
};
