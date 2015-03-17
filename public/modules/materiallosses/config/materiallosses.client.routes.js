'use strict';

//Setting up route
angular.module('materiallosses').config(['$stateProvider',
	function($stateProvider) {
		// Materiallosses state routing
		$stateProvider.
		state('listMateriallosses', {
			url: '/materiallosses',
			templateUrl: 'modules/materiallosses/views/list-materiallosses.client.view.html'
		}).
		state('createMaterialloss', {
			url: '/materiallosses/create',
			templateUrl: 'modules/materiallosses/views/create-materialloss.client.view.html'
		}).
		state('viewMaterialloss', {
			url: '/materiallosses/:materiallossId',
			templateUrl: 'modules/materiallosses/views/view-materialloss.client.view.html'
		}).
		state('viewCurrentMaterialloss', {
            url: '/materiallosses/:viewCurrentMaterialloss/:materiallossId',
            templateUrl: 'modules/materiallosses/views/view-materialloss.client.view.html'
        }).
		state('editMaterialloss', {
			url: '/materiallosses/:materiallossId/edit',
			templateUrl: 'modules/materiallosses/views/edit-materialloss.client.view.html'
		});
	}
]);