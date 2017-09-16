(function() {
    'use strict';

    angular
        .module('app')
        .controller('StateController', StateController);

    StateController.$inject = [];

    /* @ngInject */
    function StateController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
