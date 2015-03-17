'use strict';

//Setting up route
angular.module('energycosts').config(['$stateProvider',
	function($stateProvider) {
		// Energycosts state routing
		$stateProvider.
		state('listEnergycosts', {
			url: '/energycosts',
			templateUrl: 'modules/energycosts/views/list-energycosts.client.view.html'
		}).
		state('createEnergycost', {
			url: '/energycosts/create',
			templateUrl: 'modules/energycosts/views/create-energycost.client.view.html'
		}).
		state('viewEnergycost', {
			url: '/energycosts/:energycostId',
			templateUrl: 'modules/energycosts/views/view-energycost.client.view.html'
		}).
		state('viewCurrentEnergycost', {
			url: '/energycosts/:viewCurrentEnergycost/:energycostId',
			templateUrl: 'modules/energycosts/views/view-energycost.client.view.html'
		}).
		state('editEnergycost', {
			url: '/energycosts/:energycostId/edit',
			templateUrl: 'modules/energycosts/views/edit-energycost.client.view.html'
		});
	}
]);