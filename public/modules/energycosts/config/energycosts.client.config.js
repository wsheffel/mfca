'use strict';

// Configuring the Articles module
angular.module('energycosts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 4, 'Energy Cost', 'energycosts', 'dropdown', '/energycosts(/create)?');
		Menus.addSubMenuItem('topbar', 'energycosts', 'List Energy Cost', 'energycosts');
		Menus.addSubMenuItem('topbar', 'energycosts', 'New Energy Cost', 'energycosts/create');
	}
]);