'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '_',
	function($scope, Authentication, Menus, _) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.init = function(){
			var adminRole = $scope.authentication.user.role;
			if(!_.isEqual(adminRole, 'admin')){
				$scope.menu.items = _.filter($scope.menu.items, function(item) { return item.title !== "Industry"; });
			}		
		};
			
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
			
	}
]);