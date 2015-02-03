'use strict';

//Energycosts service used to communicate Energycosts REST endpoints
angular.module('energycosts').factory('Energycosts', ['$resource',
	function($resource) {
		return $resource('energycosts/:energycostId', { energycostId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);