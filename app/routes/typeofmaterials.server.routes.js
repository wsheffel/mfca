'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var typeofmaterials = require('../../app/controllers/typeofmaterials.server.controller');

	// Typeofmaterials Routes
	app.route('/typeofmaterials')
		.get(typeofmaterials.list)
		.post(users.requiresLogin, typeofmaterials.create);

	app.route('/typeofmaterials/:typeofmaterialId')
		.get(typeofmaterials.read)
		.put(users.requiresLogin, typeofmaterials.hasAuthorization, typeofmaterials.update)
		.delete(users.requiresLogin, typeofmaterials.hasAuthorization, typeofmaterials.delete);

	// Finish by binding the Typeofmaterial middleware
	app.param('typeofmaterialId', typeofmaterials.typeofmaterialByID);
};
