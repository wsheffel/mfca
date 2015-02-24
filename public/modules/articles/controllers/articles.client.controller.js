'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', '$modal', '$log', 'Industry', '_',
	function($scope, $stateParams, $location, Authentication, Articles, $modal, $log, Industry, _) {
		$scope.authentication = Authentication;
		
		$scope.isIndustry = false;
		
		$scope.industries = Industry.query();
		
		//console.log('industries....'+angular.toJson($scope.industries));
		$scope.bindIndustry = function(industryname){
			$scope.industry = _.pluck(_.where($scope.industries, {'_id':industryname}),'industry_name');
			$scope.isIndustry = true;
		};
		
		$scope.create = function() {
			debugger;
			var article = new Articles({
				list_of_industries: this.list_of_industries,
				company_name: this.company_name,
				address: this.address,
				city: this.city,
				country: this.country,
				industry: this.industry //_.assign(this.industry[0]),
				//type_of_product: this.type_of_product

			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.list_of_industries = '';
				$scope.company_name = '';
				$scope.address= '';
				$scope.city= '';
				$scope.country= '';
				$scope.industry= '';
				//$scope.type_of_product= '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
			debugger;
		};
		
	}
]);