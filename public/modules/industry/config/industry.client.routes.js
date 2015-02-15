'use strict';

// Setting up route
angular.module('industry').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listIndustries', {
			url: '/industry',
			templateUrl: 'modules/industry/views/list-industries.client.view.html'
		}).
		state('createIndustry', {
			url: '/industry/create',
			templateUrl: 'modules/industry/views/create-industry.client.view.html'
		}).
		state('viewIndustry', {
			url: '/industry/:industryId',
			templateUrl: 'modules/industry/views/view-industry.client.view.html'
		}).
		state('editIndustry', {
			url: '/industry/:industryId/edit',
			templateUrl: 'modules/industry/views/edit-industry.client.view.html'
		});
	}
]);