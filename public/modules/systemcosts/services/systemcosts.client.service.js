'use strict';

//Systemcosts service used to communicate Systemcosts REST endpoints
angular.module('systemcosts').factory('Systemcosts', ['$resource',
	function($resource) {
		return $resource('systemcosts/:systemcostId', { systemcostId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);