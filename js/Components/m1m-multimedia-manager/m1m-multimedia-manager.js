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

function controller($scope, CommService,$timeout, $mdSidenav,Ariane) {
    var ctrl = this;
    ctrl.begin = true;
    ctrl.selectedServer;

    //this.addToAriane = function(dir){
        //$scope.$broadcast("blabla", {dir: dir});
        //Ariane.addDir(dir);
        //console.log("mklegmzklregjtlrhjyln klnknhn hn")
        //this.dirAriane = Ariane.dirAriane;
    //}
    console.log( "m1mMultimediaManager:", $scope, CommService );
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers   = CommService.mediaServers;
    CommService.onupdate = function() {
        $scope.$applyAsync(); // Mise à jour du rendu
    };


    this.selectServer = function (server) {
        ctrl.selectedServer = server;
        console.log("SERVEUR CHOISI",server);
        $mdSidenav('left').toggle();

    }

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

controller.$inject = ["$scope", "CommService", "$timeout", "$mdSidenav","Ariane"  ];

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
