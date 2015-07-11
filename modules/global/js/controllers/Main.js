
(function() {
    'use strict';

    angular.module('global')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'core', '$state'];

    function MainCtrl($scope, core, $state) {
        var main = this;
    }

})();