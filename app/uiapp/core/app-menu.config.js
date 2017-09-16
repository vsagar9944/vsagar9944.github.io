(function() {
    'use strict';
    angular
        .module('app')
        .config(menuConfig);

    menuConfig.$inject = ['moduleMenuProvider'];

    function menuConfig (moduleMenuProvider) {
        moduleMenuProvider.addMenu({
            name: 'Maps',
            shortname: 'Maps',
            state: 'app.default',
            type: 'link',
            image: 'map.svg',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Highcharts',
            shortname: 'Highcharts',
            state: 'app.dashboard.main',
            type: 'link',
            image: 'charts.svg',
            priority: 1.1,
            filesList:["app/uiapp/dashboard/dashboard.module.js",
                "app/uiapp/dashboard/dashboard.route.config.js",
                "app/uiapp/dashboard/dashboard.run.js",
                "app/uiapp/dashboard/controllers/main-dashboard.controller.js"
            ]
        });
        moduleMenuProvider.addMenu({
            name: 'Workorder',
            shortname: 'Workorder',
            state: 'triangular.workorder.myworkorder',
            type: 'link',
            image: 'workorder',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Performance Management',
            shortname: 'Performance Mgt.',
            state: 'triangular.performancemanagement.myperformancereports',
            type: 'link',
            image: 'performance',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'NetVelocity',
            shortname: 'NetVelocity',
            state: 'triangular.netvelocity.devicesmanager',
            type: 'link',
            image: 'netvelocity',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Configuration Management',
            shortname: 'Config Mgt.',
            state: 'triangular.configuration.networktree',
            type: 'link',
            image: 'configuration',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Business Process Management System',
            shortname: 'BPMS',
            state: 'triangular.bpms.workflows',
            type: 'link',
            image: 'bpms',
            priority: 1.2
        });
        moduleMenuProvider.addMenu({
            name: 'Administration',
            shortname: 'Administration',
            state: 'triangular.administration.usermanagement',
            type: 'link',
            image: 'admin',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Data Integrity Management',
            shortname: 'DIM',
            state: 'triangular.dimdashboard.partial',
            type: 'link',
            image: 'dim',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'Tribe',
            shortname: 'Tribe',
            state: 'triangular.tribe.home',
            type: 'link',
            image: 'tribe',
            priority: 1.1
        });
        moduleMenuProvider.addMenu({
            name: 'FTTX',
            shortname: 'FTTX',
            state: 'triangular.fttx.logical',
            type: 'link',
            image: 'fttx',
            priority: 1.1
        });
    }
})();
