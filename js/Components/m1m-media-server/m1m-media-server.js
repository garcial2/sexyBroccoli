/**
 * Created by attalbin on 05/10/16.
 *
 */


var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-server.html" ),
    utils         = require( "../../Services/utils.js" ),
    modAngularMediaFolder      = require( "../m1m-media-folder/m1m-media-folder.js" ),
    modAngularFilAriane    = require( "../m1m-fil-ariane/m1m-fil-ariane.js" ),
    modAngularMediaFile      = require( "../m1m-media-file/m1m-media-file.js" )
    ;

module.exports = "m1m-media-server-Module";

function controller($scope, CommService, Ariane) {
    console.log( "On construit un server" );
    var ctrl = this;
    ctrl.begin = true;
    ctrl.dirAriane = [];

    this.browse = function( mediaServerId, directoryId ) {
        /*modAngularFilAriane.directories.push(directoryId);*/
        CommService.browse( mediaServerId, directoryId ).then( function(data) {
            console.log( "Browse", mediaServerId, directoryId, "=>", data );
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();

        });
    }


    this.subscribe = function (mediaRendererId) {
        return utils.subscribeBrick(mediaRendererId, "eventUPnP", function (e) {
            console.log(e);
        });
    }

}

controller.$inject = ["$scope", "CommService", "Ariane"];

angular .module     ( module.exports
                    , [CommModule
                    , modAngularMediaFolder
                    , modAngularMediaFile
                    ,modAngularFilAriane
                    ]
                    )
    .component  ( "m1mMediaServer", {
        controller  : controller,
        bindings    : {serv: "<"},
        template   : template
    });
