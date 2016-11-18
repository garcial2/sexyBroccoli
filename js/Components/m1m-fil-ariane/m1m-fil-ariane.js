var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-fil-ariane.html" )
    ;

module.exports = "m1m-fil-ariane-Module";

function controller($scope, CommService) {
    console.log( "On construit le fil d'ariane" );
    var ctrl = this;
}

controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports
    , [CommModule
    ]
)
    .component  ( "m1mFilAriane", {
        controller  : controller,
        bindings    : {file: "<"},
        template   : template
    });