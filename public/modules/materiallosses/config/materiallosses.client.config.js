'use strict';

// Configuring the Articles module
angular.module('materiallosses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 4, 'Material Losses', 'materiallosses', 'dropdown', '/materiallosses(/create)?');
		Menus.addSubMenuItem('topbar', 'materiallosses', 'List Material Losses', 'materiallosses');
		Menus.addSubMenuItem('topbar', 'materiallosses', 'New Material Losses', 'materiallosses/create');
	}
]);