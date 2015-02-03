'use strict';

//Setting up route
angular.module('systemcosts').config(['$stateProvider',
	function($stateProvider) {
		// Systemcosts state routing
		$stateProvider.
		state('listSystemcosts', {
			url: '/systemcosts',
			templateUrl: 'modules/systemcosts/views/list-systemcosts.client.view.html'
		}).
		state('createSystemcost', {
			url: '/systemcosts/create',
			templateUrl: 'modules/systemcosts/views/create-systemcost.client.view.html'
		}).
		state('viewSystemcost', {
			url: '/systemcosts/:systemcostId',
			templateUrl: 'modules/systemcosts/views/view-systemcost.client.view.html'
		}).
		state('editSystemcost', {
			url: '/systemcosts/:systemcostId/edit',
			templateUrl: 'modules/systemcosts/views/edit-systemcost.client.view.html'
		});
	}
]);