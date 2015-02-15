'use strict';

// Configuring the Articles module
angular.module('typeofmaterials').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 3, 'Type of Materials', 'typeofmaterials', 'dropdown', '/typeofmaterials(/create)?');
		Menus.addSubMenuItem('topbar', 'typeofmaterials', 'List Type of Materials', 'typeofmaterials');
		Menus.addSubMenuItem('topbar', 'typeofmaterials', 'New Type of Material', 'typeofmaterials/create');
	}
]);