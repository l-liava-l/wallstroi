
(function() {
    'use strict';

    angular.module('global')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope'];

    function HomeCtrl($scope) {
        var vm = this;

        vm.sizes = [
        	"100x100 мм",
        	"150x150 мм",
        	"200x200 мм",
        	"100x200 мм",
        	"400x400 мм",
        	"500x500 мм",
        	"600x600 мм"
        ];

        vm.size = vm.sizes[2];
        vm.placeSize = 5;
        vm.placeSizeStreet = 10;

        vm.getCost = getCost;

        function getCost() {
            var mSqare = 600 + Math.abs((100 - (parseInt(vm.size.split('x')[0]) / 200) * 100));
           
            var withDiagonal = vm.diagonal ? mSqare + (mSqare/100 * 15) : mSqare;
            var withPlaceType = vm.placeType ? withDiagonal + (mSqare/100 * 15) : withDiagonal;

            return vm.placeSize *  withPlaceType;
        }
    }
})();