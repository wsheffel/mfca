'use strict';

//Typeofmaterials service used to communicate Typeofmaterials REST endpoints
angular.module('typeofmaterials').factory('Typeofmaterials', ['$resource',
	function($resource) {
		return $resource('typeofmaterials/:typeofmaterialId', { typeofmaterialId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);