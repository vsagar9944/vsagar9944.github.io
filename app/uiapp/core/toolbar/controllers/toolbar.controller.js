(function() {
    'use strict';

    angular
        .module('app')
        .filter('keyboardShortcut', function($window) {
            return function(str) {
                if (!str) return;
                var keys = str.split('-');
                var isOSX = /Mac OS X/.test($window.navigator.userAgent);

                var seperator = (!isOSX || keys.length > 2) ? '+' : '';

                var abbreviations = {
                    M: isOSX ? '⌘' : 'Ctrl',
                    A: isOSX ? 'Option' : 'Alt',
                    S: 'Shift'
                };

                return keys.map(function(key, index) {
                    var last = index == keys.length - 1;
                    return last ? key : abbreviations[key];
                }).join(seperator);
            };
        })
        .controller('ToobarController', ToobarController);

    ToobarController.$inject = ['$mdSidenav', '$mdPanel'];

    function ToobarController($mdSidenav, $mdPanel) {
        var vm = this;
        vm.toggleLeftSideNavPanel = toggleLeftSideNavPanel;
        vm.toggleRightSideNavPanel = toggleRightSideNavPanel;

        vm.showModuleMenu = showModuleMenu;

        this.desserts = [
            'Apple Pie',
            'Donut',
            'Fudge',
            'Cupcake',
            'Ice Cream',
            'Tiramisu'
        ];

        this.selected = {
            favoriteDessert: 'Donut'
        };

        function toggleLeftSideNavPanel() {
            var panel = $mdSidenav('left-sidenav');
            if (!panel.isOpen()) {
                panel.open();
            } else {
                panel.close();
            }
        }

        function toggleRightSideNavPanel() {
            var panel = $mdSidenav('right-sidenav');

        }

        function showDialogMenu(event) {
            var newPanelPosition = $mdPanel.newPanelPosition().absolute().center();
            var panelConfig = {
                attachTo: angular.element(document.body),
                controller: 'ModuleMenuController',
                controllerAs: 'vm',
                templateUrl: 'app/uiapp/core/module-menu/views/module-menu.view.html',
                hasBackdrop: true,
                panelClass: 'demo-dialog-example',
                position: newPanelPosition,
                trapFocus: true,
                zIndex: 150,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true
            };
            $mdPanel.open(panelConfig);
        }

        function showModuleMenu(event) {
            var position = $mdPanel.newPanelPosition()
                .relativeTo('.demo-menu-open-button')
                .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

            var config = {
                attachTo: angular.element(document.body),
                controller: 'ModuleMenuController',
                controllerAs: 'ctrl',
                // templateUrl:'app/uiapp/core/module-menu/views/module-menu.view.html',
                template: '<md-menu-content>' +
                    ' <app-module-menu></app-module-menu> ' +
                    '</md-menu-content>',
                panelClass: 'demo-menu-example',
                position: position,
                locals: {
                    'selected': this.selected,
                    'desserts': this.desserts
                },
                openFrom: event,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: false,
                zIndex: 2
            };

            $mdPanel.open(config);
        };
    }
})();
