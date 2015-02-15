'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Industry Schema
 */
var IndustrySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	industry_name: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Industry', IndustrySchema);