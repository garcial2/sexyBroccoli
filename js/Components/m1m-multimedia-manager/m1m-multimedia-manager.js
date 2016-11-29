var angular		        = require( "angular" ),
    CommModule          = require( "../../Services/CommModule.js" ),
    utils         = require( "../../Services/utils.js" ),
    angularMaterial		= require( "angular-material" ),
    ngDraggable 		= require( "ng-draggable" ),
    template            = require( "./m1m-multimedia-manager.html" ),
    modAngularMediaRenderer     = require( "../m1m-media-renderer/m1m-media-renderer.js" ),
    modAngularFilAriane    = require( "../m1m-fil-ariane/m1m-fil-ariane.js" ),
    modAngularMediaServer       = require( "../m1m-media-server/m1m-media-server.js" );

module.exports = "m1m-multimedia-manager-Module";
console.log( "Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService,$timeout, $mdSidenav) {
    var ctrl = this;
    ctrl.begin = true;

    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers   = CommService.mediaServers;
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };


    ctrl.dirAriane = [];

    this.addDir = function(dir) {
        var i = 0;
        for( i=ctrl.dirAriane.length-1; i>=0; i--) {
            if( ctrl.dirAriane[i].name == dir.name) ctrl.dirAriane.splice(i,1);
        }

        ctrl.dirAriane.push(dir);
        console.log("Ajout dir ariane");
        console.log(ctrl.dirAriane);
    }






    /*this.browse = function( mediaServerId, directoryId ) {
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
    }*/

    this.subscribe = function (mediaRenderer) {
        console.log("Suscribe to renderer,",mediaRenderer.id);
        if(!ctrl.begin){
            ctrl.mediaRenderers.push(ctrl.selectedRenderer);
        }

        var i=0;

        for( i=ctrl.mediaRenderers.length-1; i>=0; i--) {
            if( ctrl.mediaRenderers[i].id == mediaRenderer.id) ctrl.mediaRenderers.splice(i,1);
        }

        ctrl.selectedRenderer = mediaRenderer;

        ctrl.begin = false;

        console.log("Liste des renderers :", ctrl.mediaRenderers);
        return  utils.subscribeBrick(mediaRenderer.id, "eventUPnP",function (e) {
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

controller.$inject = ["$scope", "CommService", "$timeout", "$mdSidenav"  ];

angular .module     ( module.exports
                    ,   [ CommModule
                        , angularMaterial
                        , "ngDraggable"
                        , modAngularMediaRenderer
                        , modAngularMediaServer
                        , modAngularFilAriane
                        , 'ngMaterial']
                    )
        .component  ( "m1mMultimediaManager", {
            controller  : controller,
            bindings    : {title: "@"},
            template	: template
        });
