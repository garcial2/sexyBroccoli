/**
 * Created by attalbin on 05/10/16.
 */


var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-server.html" )
    ;

module.exports = "m1m-media-renderer-Module";

function controller($scope, CommService) {
    var $ctrl = this;

}

controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule] )
    .component  ( "m1mMediaServer", {
        controller  : controller,
        bindings    : {nf: "<"},
        template   : template
    });