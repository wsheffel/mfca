'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Typeofmaterial Schema
 */
var TypeofmaterialSchema = new Schema({
	input_item: {
		type: String,
		default: '',
		trim: true
	},
	input_price: {
		type: Number,
		default: '',
		trim: true
	},
	input_quantity: {
		type: Number,
		default: '',
		trim: true
	},
	input_cost: {
		type: Number,
		default: '',
		trim: true
	},
	output_pamt_quantity: {
		type: Number,
		default: '',
		trim: true
	},
	output_pamt_cost: {
		type: Number,
		default: '',
		trim: true
	},
	output_lamt_quantity: {
		type: Number,
		default: '',
		trim: true
	},
	output_lamt_cost: {
		type: Number,
		default: '',
		trim: true
	},
	total_inputQuantity: {
		type: Number,
		default: '',
		trim: true
	},
	total_input_cost: {
		type: Number,
		default: '',
		trim: true
	},
	total_ProdQuantity: {
		type: Number,
		default: '',
		trim: true
	},
	total_ProdCost: {
		type: Number,
		default: '',
		trim: true
	},
	total_LossQuantity: {
		type: Number,
		default: '',
		trim: true
	},
	total_LossCost: {
		type: Number,
		default: '',
		trim: true
	},
	total_percentage: {
		type: Number,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Typeofmaterial', TypeofmaterialSchema);