(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapLayerController', MapLayerController);

    MapLayerController.$inject = ['$scope','$rootScope','leafletData','BaseMapLayerServiceLyrs'];

    function MapLayerController($scope,$rootScope,leafletData,BaseMapLayerServiceLyrs) {
        var vm = this;
        var country = {};
        var mapzoom = 5;
        var layerCanvasName = "layer_canvas";
        var maxbounds = [
            [9.44906182, 54.5800781],
            [35.92464453, 103.71093749]
        ]
        country.lat = 22.475420;
        country.lng = 77.901290;
        leafletData.getMap(layerCanvasName).then(function(currentMap) {
            window.map = currentMap;
            currentMap.baseMapService = new BaseMapLayerServiceLyrs(layerCanvasName);


        });

        angular.extend($scope, {
            center: {
                lat: country.lat,
                lng: country.lng,
                zoom: mapzoom
            },
            layers: {},
            maxbounds: maxbounds,
            defaults: {
                fadeAnimation: false,
                zoomControl: false
            }
        });
    }
})();
