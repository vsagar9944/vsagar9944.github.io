(function() {
    'use strict';

    angular
        .module('app')
        .config(appConfig);

    appConfig.$inject = ['$mdThemingProvider'];

    function appConfig($mdThemingProvider) {
        $mdThemingProvider.theme('red')
            .primaryPalette('green');
    }
})();
