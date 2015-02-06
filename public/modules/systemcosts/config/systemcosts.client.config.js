'use strict';

// Configuring the Articles module
angular.module('systemcosts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 5, 'System Cost', 'systemcosts', 'dropdown', '/systemcosts(/create)?');
		Menus.addSubMenuItem('topbar', 'systemcosts', 'List System Cost', 'systemcosts');
		Menus.addSubMenuItem('topbar', 'systemcosts', 'New System Cost', 'systemcosts/create');
	}
]);