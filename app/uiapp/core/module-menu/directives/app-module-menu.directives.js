(function() {
    'use strict';

    angular
        .module('app')
        .directive('appModuleMenu', appModuleMenuDirective);

    /* @ngInject */
    appModuleMenuDirective.$inject = [ '$location', '$mdTheming' ];

    function appModuleMenuDirective( $location, $mdTheming ) {
        var directive = {
            restrict: 'E',
            template: '<md-menu-content class="toolbar-module-picker-content" width="4">'+
                            '<app-module-menu-holder>'+
                                '<app-module-menu-item ng-repeat="item in ::appModuleMenuController.menu | orderBy:\'priority\'" item="::item">'+
                                '</app-module-menu-item>'+
                            '</app-module-menu-holder>'+
                        '</md-menu-content>',
            scope: {},
            controller: appModuleMenuController,
            controllerAs: 'appModuleMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var $mdTheme = $element.controller('mdTheme'); //eslint-disable-line

            // var menuColor = $mdTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
            // var menuColorRGBA = $mdTheming.rgba(menuColor.value);
            // $element.css({ 'background-color': menuColorRGBA });
            // $element.children('md-content').css({ 'background-color': menuColorRGBA });
        }
    }

    /* @ngInject */
    appModuleMenuController.$inject = ['moduleMenu'];
    function appModuleMenuController(moduleMenu) {
        var appModuleMenuController = this;
        // get the menu and order it
        appModuleMenuController.menu = angular.copy(moduleMenu.menu);
        console.log(appModuleMenuController.menu);
    }
})();
