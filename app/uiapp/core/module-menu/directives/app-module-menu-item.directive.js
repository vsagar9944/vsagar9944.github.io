(function() {
    'use strict';

    angular
        .module('app')
        .directive('appModuleMenuItem', appModuleMenuItemDirective);

    /* @ngInject */
    appModuleMenuItemDirective.$inject = [];

    function appModuleMenuItemDirective() {
        var directive = {
            restrict: 'E',
            require: '^appModuleMenu',
            scope: {
                item: '='
            },
            template: '<div ng-include="::vm.item.template"></div>',
            controller: appModuleMenuItemController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
    }

    /* @ngInject */
    appModuleMenuItemController.$inject = ['$scope', '$rootScope', '$mdSidenav', '$state', '$filter','$ocLazyLoad'];

    function appModuleMenuItemController($scope, $rootScope, $mdSidenav, $state, $filter,$ocLazyLoad) {

        var vm = this;

        vm.checkChanged = checkChanged;
        vm.radioChanged = radioChanged;
        vm.openSettings = openSettings;

        // load a template for this directive based on the type ( link | dropdown )
        vm.item.template = 'app/uiapp/core/module-menu/views/module-menu-item.view.html';
        if(vm.item.image.indexOf('svg') > -1){
            vm.item.image = 'app/assets/images/moduleicons/' + vm.item.image;
        }else{
            vm.item.image = 'app/assets/images/moduleicons/' + vm.item.image + '.png';
        }

        switch (vm.item.type) {
            case 'dropdown':
                // if we have kids reorder them by priority
                vm.item.children = $filter('orderBy')(vm.item.children, 'priority');
                vm.toggleDropdownMenu = toggleDropdownMenu;
                // add a check for open event
                $scope.$on('toggleDropdownMenu', function(event, item, open) {
                    // if this is the item we are looking for
                    if (vm.item === item) {
                        vm.item.open = open;
                    } else {
                        vm.item.open = false;
                    }
                });
                // this event is emitted up the tree to open parent menus
                $scope.$on('openParents', function() {
                    // openParents event so open the parent item
                    vm.item.open = true;
                    // also add this to the breadcrumbs
                });
                break;
            case 'link':
                vm.openLink = openLink;

                // on init check if this is current menu
                checkItemActive($state.current.name, $state.params);

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
                    checkItemActive(toState.name, toParams);
                });
                break;
        }

        function checkItemActive() {
            // first check if the state is the same
            vm.item.active = $state.includes(vm.item.state, vm.item.params);
            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if (vm.item.active) {
                $scope.$emit('openParents');
            }
        }

        function toggleDropdownMenu() {
            $scope.$parent.$parent.$broadcast('toggleDropdownMenu', vm.item, !vm.item.open);
        }

        function openLink() {
            if (!vm.item.filesList) {
                var params = angular.isUndefined(vm.item.params) ? {} : vm.item.params;
                $state.go(vm.item.state, params);
                vm.item.active = true;
                // $mdSidenav('layerselector').close();
            } else {
                $ocLazyLoad.load({
                    files: (vm.item.filesList || []),
                    serie: true
                }).then(function() {
                    setTimeout(function() {
                        var params = angular.isUndefined(vm.item.params) ? {} : vm.item.params;
                        $state.go(vm.item.state, params);
                        vm.item.active = true;
                        // $mdSidenav('layerselector').close();
                    }, 1000);
                }, function(err) {
                    console.log(err);
                });
            }
        }

        function checkChanged(item) {
            if (item && item.selected) {
                $rootScope.$broadcast(item.eventname + '-On', item);
            } else {
                $rootScope.$broadcast(item.eventname + '-Off', item);
            }
            $rootScope.$broadcast('appModuleMenuItemChanged', item);
        }

        function radioChanged(item) {
            if (item) {
                $rootScope.$broadcast(item.eventname, item);
            }
            $rootScope.$broadcast('appModuleMenuItemChanged', item);
        }


        function openSettings(item, ev) {
            $rootScope.$broadcast(item.eventname + '-Dialog', {
                item: item,
                event: ev
            });
        }

    }
})();
