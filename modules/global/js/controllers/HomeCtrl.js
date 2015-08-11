
(function() {
    'use strict';

    angular.module('global')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope'];

    function HomeCtrl($scope) {
        var vm = this;

        vm.sizes = [
        	"100x100",
        	"150x150",
        	"200x200",
        	"100x200",
        	"400x400",
        	"500x500",
        	"600x600"
        ];
    }
})();