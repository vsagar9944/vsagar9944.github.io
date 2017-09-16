(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/uiapp/core/views/main.view.html',
                        controller: 'StateController',
                        controllerAs: 'vm'
                    },
                    'leftsidenav@app': {
                        templateProvider:function ($templateRequest, LayoutProvider) {
                            if (angular.isDefined(LayoutProvider.layout.leftSidenavTemplateUrl)) {
                                return $templateRequest(LayoutProvider.layout.leftSidenavTemplateUrl);
                            }
                        },
                        controllerProvider:function(LayoutProvider){
                            return LayoutProvider.layout.leftSidenavController;
                        },
                        controllerAs: 'vm'
                    },
                    'rightSidenav@app': {
                        templateProvider:function ($templateRequest, LayoutProvider) {
                            if (angular.isDefined(LayoutProvider.layout.rightSidenavTemplateUrl)) {
                                return $templateRequest(LayoutProvider.layout.rightSidenavTemplateUrl);
                            }
                        },
                        controllerProvider:function(LayoutProvider){
                            return LayoutProvider.layout.rightSidenavController;
                        },
                        controllerAs: 'vm'
                    },
                    'toolbar@app': {
                        templateProvider:function ($templateRequest, LayoutProvider) {
                            if (angular.isDefined(LayoutProvider.layout.toolbarTemplateUrl)) {
                                return $templateRequest(LayoutProvider.layout.toolbarTemplateUrl);
                            }
                        },
                        controllerProvider:function(LayoutProvider){
                            return LayoutProvider.layout.toolbarController;
                        },
                        controllerAs: 'vm'
                    },
                    'footer@app': {
                        templateProvider:function ($templateRequest, LayoutProvider) {
                            if (angular.isDefined(LayoutProvider.layout.footerTemplateUrl)) {
                                return $templateRequest(LayoutProvider.layout.footerTemplateUrl);
                            }
                        },
                        controllerProvider:function(LayoutProvider){
                            return LayoutProvider.layout.footerController;
                        },
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.default',{
                views:{
                    'default-module':{
                        templateUrl:"app/uiapp/default/views/default.view.html",
                        controller:'MapLayerController',
                        controllerAs:'vm'
                    }
                }
            })
    }
})();
