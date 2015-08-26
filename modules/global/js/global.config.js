(function(){
	'use strict';

	angular.module('global', ['ngMaterial', 'ui.router'])
		.config(config);

	config.$inject = ['$mdThemingProvider', '$urlRouterProvider', '$stateProvider'];

	function config($mdThemingProvider, $urlRouterProvider, $stateProvider){

		$mdThemingProvider.theme('default')
			.primaryPalette('blue-grey');


		$stateProvider
			.state('contacts', {
				"url": "/contacts",
				"views": {
					"content": {
						"templateUrl": "views/contacts/contacts.html"
					}
				}
			})

			.state('company', {
				"url": "/company",
				"views": {
					"content": {
						"templateUrl": "views/company/company.html"
					}
				}
			})

			.state('services', {
				"url": "/services",
				"views": {
					"content": {
						"templateUrl": "views/services/services.html"
					}
				}
			})
	}
})();


    