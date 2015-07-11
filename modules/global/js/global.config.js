(function(){
	'use strict';

	angular.module('global', ['ngMaterial'])
		.config(config);

	config.$inject = ['$mdThemingProvider'];

	function config($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('indigo')
			.accentPalette('red');
	}
})();


    