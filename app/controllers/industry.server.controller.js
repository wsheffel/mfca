'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Industry = mongoose.model('Industry'),
	_ = require('lodash');

/**
 * Create a industry
 */
exports.create = function(req, res) {
	var industry = new Industry(req.body);
	industry.user = req.user;

	industry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(industry);
		}
	});
};

/**
 * Show the current industry
 */
exports.read = function(req, res) {
	res.json(req.industry);
};

/**
 * Update a industry
 */
exports.update = function(req, res) {
	var industry = req.industry;

	industry = _.extend(industry, req.body);

	industry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(industry);
		}
	});
};

/**
 * Delete an industry
 */
exports.delete = function(req, res) {
	var industry = req.industry;

	industry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(industry);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Industry.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Industry middleware
 */
exports.industryByID = function(req, res, next, id) {
	Industry.findById(id).populate('user', 'displayName').exec(function(err, industry) {
		if (err) return next(err);
		if (!industry) return next(new Error('Failed to load industry ' + id));
		req.industry = industry;
		next();
	});
};

/**
 * Industry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.industry.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};