'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Energycost = mongoose.model('Energycost'),
	_ = require('lodash');

/**
 * Create a Energycost
 */
exports.create = function(req, res) {
	var energycost = new Energycost(req.body);
	energycost.user = req.user;

	energycost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(energycost);
		}
	});
};

/**
 * Show the current Energycost
 */
exports.read = function(req, res) {
	res.jsonp(req.energycost);
};

/**
 * Update a Energycost
 */
exports.update = function(req, res) {
	var energycost = req.energycost ;

	energycost = _.extend(energycost , req.body);

	energycost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(energycost);
		}
	});
};

/**
 * Delete an Energycost
 */
exports.delete = function(req, res) {
	var energycost = req.energycost ;

	energycost.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(energycost);
		}
	});
};

/**
 * List of Energycosts
 */
exports.list = function(req, res) { 
	Energycost.find().sort('-created').populate('user', 'displayName').exec(function(err, energycosts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(energycosts);
		}
	});
};

/**
 * Energycost middleware
 */
exports.energycostByID = function(req, res, next, id) { 
	Energycost.findById(id).populate('user', 'displayName').exec(function(err, energycost) {
		if (err) return next(err);
		if (! energycost) return next(new Error('Failed to load Energycost ' + id));
		req.energycost = energycost ;
		next();
	});
};

/**
 * Energycost authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.energycost.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
