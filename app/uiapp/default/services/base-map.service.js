(function() {
    'use strict';

    angular
        .module('app')
        .service('BaseMapLayerServiceLyrs', BaseMapLayerServiceLyrs);

    /* @ngInject */

    BaseMapLayerServiceLyrs.$inject = [
        '$q',
        '$log',
        'leafletData'
    ];

    function BaseMapLayerServiceLyrs($q, $log, leafletData) {

        function Layer(mapid) {

            var that = this;
            this.mapid = mapid ? mapid : 'layer_canvas';
            this._map = null;
            this._basemap = null;
            this.convertImgURLToGrayImg = function() {
                var $img = jQuery('#layer_canvas img[src*=google]');
                if ($img.length == 0) {
                    $img = jQuery('#layer_canvas img[src*="data:image"]');
                    return false;
                }
                var totalImg = $img.length;
                var waitImgDone = function() {
                    totalImg--;
                    if (!totalImg) {}
                };
                if (true) {
                    $img.each(function(index) {
                        jQuery(this).addClass("jcp-maptiles");
                        that.convertImgToBase64URL(this, waitImgDone);
                    });
                } else {}
            }
            this.convertImgToBase64URL = function(imgElement, waitImgDone) {
                if (true) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function() {
                        var canvas = document.createElement('CANVAS'),
                            ctx = canvas.getContext('2d'),
                            dataURL;
                        canvas.height = this.height;
                        canvas.width = this.width;
                        ctx.drawImage(this, 0, 0);
                        var imageData = ctx.getImageData(0, 0, this.width, this.height);
                        ctx.putImageData(imageData, 0, 0);
                        dataURL = canvas.toDataURL("png");
                        jQuery(imgElement).attr("src", dataURL);
                        jQuery(imgElement).load(function() {
                            waitImgDone();
                        });
                        canvas = null;
                    };
                    if (GetIEVersion() == 0) {
                        img.src = imgElement.src;
                    } else {}
                }
            }

            function GetIEVersion() {
                var sAgent = window.navigator.userAgent;
                var Idx = sAgent.indexOf("MSIE");
                if (Idx > 0)
                    return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
                else if (!!navigator.userAgent.match(/Trident\/7\./))
                    return 11;
                else
                    return 0;
            }
            this.addLayer = function(basemap) {
                leafletData.getMap(that.mapid).then(function(currentMap) {
                    that._map = currentMap;
                    // Remove Exisiting IF
                    if (that._basemap) {
                        currentMap.removeLayer(that._basemap);
                    }
                    that._basemap = basemap;
                    currentMap.addLayer(that._basemap);
                    that._basemap.on('load', function() {
                        setTimeout(function() {
                            that.convertImgURLToGrayImg();
                        }, 500);
                    })
                });
            };

            this.init = function() {
                var basemap = this.baseLayers['googleRoadmap'];
                this.addLayer(basemap);
            };

            this.changeLayer = function(item) {
                var key = 'googleRoadmap';
                switch (item) {
                    case 'Terrain':
                        key = 'googleTerrain';
                        break;
                    case 'Satellite':
                        key = 'googleHybrid';
                        break;
                    case 'Streets Gray Scale':
                        key = 'googleRoadmapGrey';
                        break;
                    case 'Streets Night':
                        key = 'googleRoadmapNight';
                        break;
                    default:
                        key = 'googleRoadmap';
                }
                var options = this.baseLayers[key];
                if (!options) return false;
                this.addLayer(options);
            };

            this.baseLayers = {
                get googleRoadmapGrey() {
                    return L.gridLayer.googleMutant({
                        type: 'roadmap',
                        styles: [{
                                "stylers": [{
                                    "saturation": -100
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [{
                                    "visibility": "on"
                                }]
                            }
                        ]
                    });
                },
                get googleRoadmapNight() {
                    return L.gridLayer.googleMutant({
                        type: 'roadmap',
                        styles: [{
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#242f3e"
                                }]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#746855"
                                }]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [{
                                    "color": "#242f3e"
                                }]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#79473d"
                                }]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "visibility": "on"
                                }]
                            },
                            {
                                "featureType": "administrative.locality",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#d59563"
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [{
                                    "visibility": "on"
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#d59563"
                                }]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#263c3f"
                                }]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#6b9a76"
                                }]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#38414e"
                                }]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#212a37"
                                }]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#9ca5b3"
                                }]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#746855"
                                }]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#1f2835"
                                }]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#f3d19c"
                                }]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#2f3948"
                                }]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#d59563"
                                }]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#17263c"
                                }]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#515c6d"
                                }]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.stroke",
                                "stylers": [{
                                    "color": "#17263c"
                                }]
                            }
                        ]
                    });
                },
                get googleRoadmap() {
                    return L.gridLayer.googleMutant({
                        type: 'roadmap',
                    });
                },
                get googleTerrain() {
                    return L.gridLayer.googleMutant({
                        type: 'terrain'
                    });
                },
                get googleHybrid() {
                    return L.gridLayer.googleMutant({
                        type: 'hybrid'
                    });
                }
            };

            this.init();

        };

        return Layer;
    }
})();
