var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-fil-ariane.html" )
    ;

module.exports = "m1m-fil-ariane-Module";

function controller($scope, CommService, breadcrumbs) {
    console.log( "On construit le fil d'ariane" );
    var ctrl = this;
    $scope.breadcrumbs = breadcrumbs;
}

controller.$inject = ["$scope", "CommService","breadcrumbs"];

angular .module     ( module.exports
    , [CommModule, 'services.breadcrumbs'
    ]
)
    .component  ( "m1mFilAriane", {
        controller  : controller,
        bindings    : {file: "<"},
        template   : template
    });


