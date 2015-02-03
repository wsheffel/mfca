'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Typeofmaterial = mongoose.model('Typeofmaterial'),
	_ = require('lodash');

/**
 * Create a Typeofmaterial
 */
exports.create = function(req, res) {
	var typeofmaterial = new Typeofmaterial(req.body);
	typeofmaterial.user = req.user;
	typeofmaterial.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typeofmaterial);
		}
	});
};

/**
 * Show the current Typeofmaterial
 */
exports.read = function(req, res) {
	res.jsonp(req.typeofmaterial);
};

/**
 * Update a Typeofmaterial
 */
exports.update = function(req, res) {
	var typeofmaterial = req.typeofmaterial ;

	typeofmaterial = _.extend(typeofmaterial , req.body);

	typeofmaterial.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typeofmaterial);
		}
	});
};

/**
 * Delete an Typeofmaterial
 */
exports.delete = function(req, res) {
	var typeofmaterial = req.typeofmaterial ;

	typeofmaterial.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typeofmaterial);
		}
	});
};

/**
 * List of Typeofmaterials
 */
exports.list = function(req, res) { 
	Typeofmaterial.find().sort('-created').populate('user', 'displayName').exec(function(err, typeofmaterials) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typeofmaterials);
		}
	});
};

/**
 * Typeofmaterial middleware
 */
exports.typeofmaterialByID = function(req, res, next, id) { 
	Typeofmaterial.findById(id).populate('user', 'displayName').exec(function(err, typeofmaterial) {
		if (err) return next(err);
		if (! typeofmaterial) return next(new Error('Failed to load Typeofmaterial ' + id));
		req.typeofmaterial = typeofmaterial ;
		next();
	});
};

/**
 * Typeofmaterial authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.typeofmaterial.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
