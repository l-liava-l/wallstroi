(function(){
	'use strict';

	angular.module('global', ['ngMaterial'])
		.config(config);

	config.$inject = ['$mdThemingProvider'];

	function config($mdThemingProvider){
		$mdThemingProvider.definePalette('dark-green', {
		    '50': 'rgba(48, 178, 55, 1)',
		    '100': 'rgba(48, 178, 55, 1)',
		    '200': 'rgba(48, 178, 55, 1)',
		    '300': 'rgba(48, 178, 55, 1)',
		    '400': 'rgba(48, 178, 55, 1)',
		    '500': 'rgba(48, 178, 55, 1)',
		    '600': 'rgba(48, 178, 55, 1)',
		    '700': 'rgba(48, 178, 55, 1)',
		    '800': 'rgba(48, 178, 55, 1)',
		    '900': 'rgba(48, 178, 55, 1)',
		    'A100': 'rgba(48, 178, 55, 1)',
		    'A200': 'rgba(48, 178, 55, 1)',
		    'A400': 'rgba(48, 178, 55, 1)',
		    'A700': 'rgba(48, 178, 55, 1)',
		    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light
		    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		     '200', '300', '400', 'A100'],
		    'contrastLightColors': undefined    // could also specify this if default was 'dark'
		  });

		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('dark-green');
	}
})();


    