'use strict';

//Industry service used for communicating with the industry REST endpoints
angular.module('industry').factory('Industry', ['$resource',
	function($resource) {
		return $resource('industry/:industryId', {
			industryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

