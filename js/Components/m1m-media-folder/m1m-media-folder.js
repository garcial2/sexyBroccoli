var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-folder.html" )
    ;

module.exports = "m1m-media-folder-Module";

function controller($scope, CommService) {
    console.log( "On construit un folder" );
    var ctrl = this;

    this.browse = function( mediaServerId, directoryId ) {
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });
    }

}

controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports
                    , [CommModule
                    ]
)
    .component  ( "m1mMediaFolder", {
        controller  : controller,
        bindings    : {fold: "<"},
        template   : template
    });