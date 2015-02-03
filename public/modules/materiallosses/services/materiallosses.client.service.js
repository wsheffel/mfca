'use strict';

//Materiallosses service used to communicate Materiallosses REST endpoints
angular.module('materiallosses').factory('Materiallosses', ['$resource',
	function($resource) {
		return $resource('materiallosses/:materiallossId', { materiallossId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);