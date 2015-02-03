'use strict';

//Setting up route
angular.module('typeofmaterials').config(['$stateProvider',
	function($stateProvider) {
		// Typeofmaterials state routing
		$stateProvider.
		state('listTypeofmaterials', {
			url: '/typeofmaterials',
			templateUrl: 'modules/typeofmaterials/views/list-typeofmaterials.client.view.html'
		}).
		state('createTypeofmaterial', {
			url: '/typeofmaterials/create',
			templateUrl: 'modules/typeofmaterials/views/create-typeofmaterial.client.view.html'
		}).
		state('viewTypeofmaterial', {
			url: '/typeofmaterials/:typeofmaterialId',
			templateUrl: 'modules/typeofmaterials/views/view-typeofmaterial.client.view.html'
		}).
		state('editTypeofmaterial', {
			url: '/typeofmaterials/:typeofmaterialId/edit',
			templateUrl: 'modules/typeofmaterials/views/edit-typeofmaterial.client.view.html'
		});
	}
]);