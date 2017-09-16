(function() {
    'use strict';

    angular
        .module('dashboard')
        .config(dashboardConfig);

    dashboardConfig.$inject = ['$stateProvider'];

    function dashboardConfig ($stateProvider) {
        $stateProvider
            .state('app.dashboard',{
                abstract:true,
                views:{
                    'default-module':{
                        template:"<div ui-view></div>"
                    }
                }
            }).
            state('app.dashboard.main',{
				url:'dashboard',
                templateUrl:'app/uiapp/dashboard/views/dashboard.view.html',
                controller:'MainDashboardController'
            });
    }
})();
