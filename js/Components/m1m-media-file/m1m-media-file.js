var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-file.html" )
    ;

module.exports = "m1m-media-file-Module";

function controller($scope, CommService) {
    console.log( "On construit un file" );
    var ctrl = this;
    this.mediaRenderers = CommService.mediaRenderers;

    this.loadMedia = function(mediaRendererId, mediaServerId, itemId){
        CommService.loadMedia(mediaRendererId,mediaServerId,itemId).then(function (data) {
            console.log( "Load media", mediaRendererId, mediaServerId, mediaServerId, itemId, "=>", data );
            CommService.play(mediaRendererId);
            $scope.$applyAsync();
        });
    }

}

controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports
    , [CommModule
    ]
)
    .component  ( "m1mMediaFile", {
        controller  : controller,
        bindings    : {file: "<"},
        template   : template
    });