/**
 * Created by attalbin on 05/10/16.
 */

var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-renderer.html" ),
    angularMaterial = require("angular-material")
    ;

module.exports = "m1m-media-renderer-Module";


function controller($scope, CommService) {
    var $ctrl = this;
    $scope.vol= 50;

    console.log( "On construit un renderer" );
    this.play = function() {
        CommService.play( $ctrl.nf.id );
    }
    this.stop = function () {
        CommService.stop( $ctrl.nf.id );
    }
    this.pause = function () {
        CommService.pause( $ctrl.nf.id );
    }

    this.setVolume = function () {
        CommService.setVolume( $ctrl.nf.id, $scope.vol);
        console.log($scope.vol)
    }

    /*
     this.loadMedia = function(mediaRendererId, mediaServerId, itemId){
         CommService.loadMedia(mediaRendererId,mediaServerId,itemId).then(function (data) {
         console.log( "Load media", mediaServerId, mediaServerId, itemId, "=>", data );
         $scope.$applyAsync();
         });
     }*/
}

controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule, angularMaterial] )
    .component  ( "m1mMediaRenderer", {
        controller  : controller,
        bindings    : {rd: "<"},
        template   : template
    });