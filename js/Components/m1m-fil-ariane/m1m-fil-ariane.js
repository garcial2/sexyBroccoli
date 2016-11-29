
var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-fil-ariane.html" ),
    utils         = require( "../../Services/utils.js" )
    ;

module.exports = "m1m-fil-ariane";

function controller($scope, CommService) {
    var ctrl = this;

}



controller.$inject = ["$scope", "CommService"];

var moduleAriane = angular .module     ( module.exports
    , [CommModule
    ]
)
    .component  ( "m1mFilAriane", {
        controller  : controller,
        bindings    : {directories: "<"},
        template   : template
    });


moduleAriane.factory('factoryAriane', function() {
    return {
        alertA: function() {
            alert('a');
        }
    };
});


