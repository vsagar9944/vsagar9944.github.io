(function() {
    'use strict';

    angular
        .module('app')
        .provider('LayoutProvider',LayoutProvider)
    LayoutProvider.$inject = [];

    function LayoutProvider() {
        var layoutDefaults = {
            mainTemplateUrl: 'app/uiapp/core/views/main.view.html',
            mainController: 'StateController',
            leftSidenavTemplateUrl: 'app/uiapp/core/leftsidenav/views/left-sidenav.view.html',
            leftSidenavController: 'LeftSidenavController',
            rightSidenavTemplateUrl: 'app/uiapp/core/leftsidenav/views/left-sidenav.view.html',
            rightSidenavController: 'LeftSidenavController',
            footerTemplateUrl:'',
            footerController:'',
            toolbarTemplateUrl:'app/uiapp/core/toolbar/views/toolbar.view.html',
            toolbarController:'ToobarController'
        }

        this.getDefaultOption = getDefaultOption;
        this.setDefaultOption = setDefaultOption;


        function getDefaultOption(name) {
            return layoutDefaults[name];
        }

        function setDefaultOption(name, value) {
            if (value && defaultConfig[name]) {
                defaultConfig[name] = value;
            }
        }
        var layout = {};
        angular.extend(layout, layoutDefaults);

        this.$get = function() {
            function setLayoutOptions(name, value) {
                if (value && defaultConfig[name]) {
                    defaultConfig[name] = value;
                }
            }
            return {
                layout: layout,
                setLayoutOptions: setLayoutOptions
            }
        }
    }
})();
