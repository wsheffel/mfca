'use strict';

angular.module('industry').controller('IndustryController', 
		['$scope', '$stateParams', '$location', 'Authentication', 'Industry', '$modal', '$log', '_',
	function($scope, $stateParams, $location, Authentication, Industry, $modal, $log, _) {
		$scope.authentication = Authentication;
		$scope.searchIndustry = '';
		$scope.isInput = '-active';

		$scope.create = function() {
			var industry = new Industry({
				title: this.title,
				industry_name: this.industry_name
			});
			industry.$save(function(response) {
				$location.path('industry/' + response._id);

				$scope.title = '';
				$scope.industry_name = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(industry) {
			if (industry) {
				industry.$remove();

				for (var i in $scope.industries) {
					if ($scope.industries[i] === industry) {
						$scope.industries.splice(i, 1);
					}
				}
			} else {
				$scope.industry.$remove(function() {
					$location.path('industry');
				});
			}
		};

		$scope.update = function() {
			var industry = $scope.industry;

			industry.$update(function() {
				$location.path('industry/' + industry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.industries = Industry.query();
		};

		$scope.findOne = function() {
			$scope.industry = Industry.get({
				industryId: $stateParams.industryId
			});
		};
	}
]);