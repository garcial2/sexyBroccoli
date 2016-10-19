var angular	= require( "angular"    )
var utils   = require( "./utils.js" );
var parser	= new DOMParser();

module.exports = "CommModule";
var CommModule = angular.module(module.exports, []);

var initDone = false;
var serviceComm = {
    mediaRenderers  : [],
    mediaServers    : [],
    onbrickAppear   : function(brick) {
        if(brick.type.includes("BrickUPnP_MediaRenderer") ) {
            serviceComm.mediaRenderers.push( brick );
            if(serviceComm.onupdate) {serviceComm.onupdate( "appear", "BrickUPnP_MediaRenderer", brick );}
        }
        if(brick.type.includes("BrickUPnP_MediaServer") ) {
            serviceComm.mediaServers.push( brick );
            if(serviceComm.onupdate) {serviceComm.onupdate( "appear", "BrickUPnP_MediaServer", brick );}
        }
    },
    init        : function() {
        if(initDone) {return this;} else {initDone = true;}
        utils.initIO( location.hostname + ":" + location.port + "/m2m" );
        utils.XHR( "GET", "/getContext").then( function(xhr) {
            var i, context = JSON.parse( xhr.responseText );
            console.log( "received context:", context);
            for(i in context.bricks ) {
                serviceComm.onbrickAppear( context.bricks[i] );
            }
            utils.io.on	( "brickAppears", function(brick) {
                console.log( "brickAppears", brick );
                serviceComm.onbrickAppear( brick );
            });
            utils.io.on	( "brickDisappears", function( data ) {
                console.log("brick brickDisappears", data.brickId);
                var index, hasId = function(brick, i) {index = i; return brick.id === data.brickId;};
                if(serviceComm.mediaRenderers.find( hasId ) && serviceComm.onupdate) {
                    serviceComm.mediaRenderers.splice(index, 1);
                    serviceComm.onupdate( "disappear", "BrickUPnP_MediaRenderer", data.brickId );
                }
                if(serviceComm.mediaServers.find  ( hasId ) && serviceComm.onupdate) {
                    serviceComm.mediaServers.splice(index, 1);
                    serviceComm.onupdate( "disappear", "BrickUPnP_MediaServer"  , data.brickId );
                }
            });
        });
        return this;
    },
    onupdate    : null,
    play        : function(mediaRendererId) {
        return utils.call(mediaRendererId, "Play" , []);
    },
    pause       : function(mediaRendererId) {
        return utils.call(mediaRendererId, "Pause", []);
    },
    stop        : function(mediaRendererId) {
        return utils.call(mediaRendererId, "Stop", []);
    },
    setVolume   : function(mediaRendererId, volume) {
        return utils.call(mediaRendererId, "setVolume", [volume]);
    },
    loadMedia   : function(mediaRendererId, mediaServerId, itemId) {
        return utils.call(mediaRendererId, "loadMedia", [mediaServerId, itemId]);
    },
    browse      : function(mediaServerId, directoryId) {
        directoryId = directoryId || 0;
        return utils.call( mediaServerId, "Browse", [directoryId] ).then( function(dataString) {
            var dataBrowse = {
                parentDirectory : directoryId,
                directories     : [],
                medias          : [],
                error           : null
            };
            try {
                var doc         = parser.parseFromString( dataString, "text/xml" );
                var Result      = doc.querySelector("Result");
                var ResultDoc   = parser.parseFromString(Result.textContent, "text/xml");
                var i, j, title, icon, media, L;

                // Parse containers
                var L_containers = ResultDoc.querySelectorAll('container');
                for(i=0; i<L_containers.length; i++) {
                    var container = L_containers.item(i);
                    title	= container.querySelector('title').textContent;
                    icon	= container.querySelector('albumArtURI'); icon = icon?icon.textContent:"";
                    dataBrowse.directories.push( {serverId: mediaServerId, name: title, iconURL: icon, directory: container.getAttribute("id")} );
                } // End of containers parsing

                // Parse item
                var L_items	= ResultDoc.querySelectorAll('item');
                for(i=0; i<L_items.length; i++) {
                    var node, item = L_items.item(i);
                    dataBrowse.medias.push( media = {
                        // xmlItem         : item,
                        serverId        : mediaServerId,
                        date            : (node=item.querySelector('date'))?node.textContent:"inconnue",
                        title           : (node=item.querySelector('title'))?node.textContent:"inconnu",
                        icon            : (node=item.querySelector('icon'))?node.textContent:"images/media_icon.jpg",
                        mediaId         : item.getAttribute("id"),
                        creator         : (node=item.querySelector('creator'))?node.textContent:"inconnu",
                        actors          : [],
                        genres          : [],
                        albumarturi     : (node=item.querySelector('albumarturi, albumArtURI, albumArtUri'))?node.textContent:"",
                        description     : (node=item.querySelector('description'))?node.textContent:"",
                        longdescription : (node=item.querySelector('longdescription, longDescription'))?node.textContent:"",
                        ressource       : (node=item.querySelector('res'))?node.textContent:"",
                        class           : (node=item.querySelector('class'))?node.textContent:""
                    } );
                    L = item.querySelectorAll( "actor" );
                    for(j=0; j<L.length; j++) {
                        media.actors.push( L.item(j).textContent );
                    }
                    L = item.querySelectorAll( "genre" );
                    for(j=0; j<L.length; j++) {
                        media.genres.push( L.item(j).textContent );
                    }
                } // End of items parsing
            } catch(err) {dataBrowse.error = err;}
            return dataBrowse;
        });
    }
    //
};

CommModule.factory('CommService', function() {
    return serviceComm.init();
});

