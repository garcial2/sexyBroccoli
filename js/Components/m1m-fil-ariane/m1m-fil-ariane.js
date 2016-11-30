
var angular    = require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-fil-ariane.html" ),
    utils         = require( "../../Services/utils.js" )
    ;

module.exports = "m1m-fil-ariane";

function controller($scope, CommService) {
    var ctrl = this;
    ctrl.dirAriane = [];

    ctrl.addDir = function(dir) {
        console.log(dir);
        var i = 0;
        if(ctrl.dirAriane.length > 0 && dir.class == "BrickUPnP_MediaServer"){
            ctrl.dirAriane =[];
        }
        for( i=ctrl.dirAriane.length-1; i>=0; i--) {
            if( ctrl.dirAriane[i].name == dir.name) ctrl.dirAriane.splice(i,1);
        }


        ctrl.dirAriane.push(dir);
        console.log("Ajout dir ariane");
        console.log(ctrl.dirAriane);
    }

    $scope.$on("blabla", function (event, args) {
        ctrl.addDir(args.dir);
    });
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

var serviceAriane = {
    init : function(){
        return this;
    } ,
    dirAriane : [],
    addDir : function(dir) {
        console.log(dir);
        var i = 0;
        if(serviceAriane.dirAriane.length > 0 && dir.class == "BrickUPnP_MediaServer"){
            serviceAriane.dirAriane =[];
        }
        for( i=serviceAriane.dirAriane.length-1; i>=0; i--) {
            if( serviceAriane.dirAriane[i].name == dir.name) serviceAriane.dirAriane.splice(i,1);
        }


        serviceAriane.dirAriane.push(dir);
        console.log("Ajout dir ariane");
        console.log(serviceAriane.dirAriane);
    }
}

moduleAriane.factory('Ariane', function() {
    return serviceAriane.init();
});


