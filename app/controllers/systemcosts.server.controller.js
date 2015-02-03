'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Systemcost = mongoose.model('Systemcost'),
	_ = require('lodash');

/**
 * Create a Systemcost
 */
exports.create = function(req, res) {
	var systemcost = new Systemcost(req.body);
	systemcost.user = req.user;

	systemcost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(systemcost);
		}
	});
};

/**
 * Show the current Systemcost
 */
exports.read = function(req, res) {
	res.jsonp(req.systemcost);
};

/**
 * Update a Systemcost
 */
exports.update = function(req, res) {
	var systemcost = req.systemcost ;

	systemcost = _.extend(systemcost , req.body);

	systemcost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(systemcost);
		}
	});
};

/**
 * Delete an Systemcost
 */
exports.delete = function(req, res) {
	var systemcost = req.systemcost ;

	systemcost.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(systemcost);
		}
	});
};

/**
 * List of Systemcosts
 */
exports.list = function(req, res) { 
	Systemcost.find().sort('-created').populate('user', 'displayName').exec(function(err, systemcosts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(systemcosts);
		}
	});
};

/**
 * Systemcost middleware
 */
exports.systemcostByID = function(req, res, next, id) { 
	Systemcost.findById(id).populate('user', 'displayName').exec(function(err, systemcost) {
		if (err) return next(err);
		if (! systemcost) return next(new Error('Failed to load Systemcost ' + id));
		req.systemcost = systemcost ;
		next();
	});
};

/**
 * Systemcost authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.systemcost.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
