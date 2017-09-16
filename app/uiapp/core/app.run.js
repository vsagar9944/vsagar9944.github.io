(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$state'];
    function appRun($state) {
        $state.go('app.default');
        // $state.go('app.dashboard');
    }
})();
