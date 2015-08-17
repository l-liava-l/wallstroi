
(function() {
    'use strict';

    angular.module('global')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$mdSidenav'];

    function MainCtrl($scope, $mdSidenav) {
        var main = this;

        main.openRight = openRight;
        main.closeRight = closeRight;

        function openRight(id){
        	main.article = id;
        	$mdSidenav('right').open();
        }

        function closeRight() {
	    	$mdSidenav('right').close()
	    };
    }

})();