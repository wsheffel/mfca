'use strict';

// Configuring the Industry module
angular.module('industry').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 1, 'Industry', 'industry', 'dropdown', '/industry(/create)?');
		Menus.addSubMenuItem('topbar', 'industry', 'List Industries', 'industry');
		Menus.addSubMenuItem('topbar', 'industry', 'New Industry', 'industry/create');
	}
]);