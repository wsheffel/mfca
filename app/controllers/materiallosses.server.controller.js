'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Materialloss = mongoose.model('Materialloss'),
	_ = require('lodash');

/**
 * Create a Materialloss
 */
exports.create = function(req, res) {
	var materialloss = new Materialloss(req.body);
	materialloss.user = req.user;

	materialloss.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(materialloss);
		}
	});
};

/**
 * Show the current Materialloss
 */
exports.read = function(req, res) {
	res.jsonp(req.materialloss);
};

/**
 * Update a Materialloss
 */
exports.update = function(req, res) {
	var materialloss = req.materialloss ;

	materialloss = _.extend(materialloss , req.body);

	materialloss.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(materialloss);
		}
	});
};

/**
 * Delete an Materialloss
 */
exports.delete = function(req, res) {
	var materialloss = req.materialloss ;

	materialloss.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(materialloss);
		}
	});
};

/**
 * List of Materiallosses
 */
exports.list = function(req, res) { 
	Materialloss.find().sort('-created').populate('user', 'displayName').exec(function(err, materiallosses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(materiallosses);
		}
	});
};

/**
 * Materialloss middleware
 */
exports.materiallossByID = function(req, res, next, id) { 
	Materialloss.findById(id).populate('user', 'displayName').exec(function(err, materialloss) {
		if (err) return next(err);
		if (! materialloss) return next(new Error('Failed to load Materialloss ' + id));
		req.materialloss = materialloss ;
		next();
	});
};

/**
 * Materialloss authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.materialloss.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
