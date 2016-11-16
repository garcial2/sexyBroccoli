var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    utils         = require( "../../Services/utils.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-multimedia-manager.html" ),
    modAngularMediaRenderer     = require( "../m1m-media-renderer/m1m-media-renderer.js" ),
    modAngularMediaServer       = require( "../m1m-media-server/m1m-media-server.js" );

module.exports = "m1m-multimedia-manager-Module";
console.log( "Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService,$timeout, $mdSidenav) {
    var ctrl = this;

    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers   = CommService.mediaServers;
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };

    this.browse = function( mediaServerId, directoryId ) {
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });
    }

    this.loadMedia = function(mediaRendererId, mediaServerId, itemId){
        CommService.loadMedia(mediaRendererId,mediaServerId,itemId).then(function (data) {
            //var callb = function(obj){console.log(obj);}
            console.log( "Load media", mediaServerId, mediaServerId, itemId, "=>", data );
            CommService.play(mediaRendererId);
            $scope.$applyAsync();
        });
    }

    this.subscribe = function (mediaRendererId) {
        return  utils.subscribeBrick(mediaRendererId, "eventUPnP",function (e) {
            console.log(e);
        });
    }

	/* DESIGN FUNCTIONS */ 
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');

	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
        	}
    	}
	/* END DESIGN FUNCTIONS */

}
controller.$inject = ["$scope", "CommService", "$timeout", "$mdSidenav"];

angular .module     ( module.exports
                    ,   [ CommModule
                        , angularMaterial
                        , "ngDraggable"
                        , modAngularMediaRenderer
                        , modAngularMediaServer
                        , 'ngMaterial']
                    )
        .component  ( "m1mMultimediaManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });
