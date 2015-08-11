
(function() {
    'use strict';

    angular.module('global')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope'];

    function MainCtrl($scope) {
        var main = this;
    }

})();