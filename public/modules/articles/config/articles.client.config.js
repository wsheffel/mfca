'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 1, 'Company', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Company', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Company', 'articles/create');
	}
]);