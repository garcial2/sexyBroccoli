var io = require( 'socket.io-client' );

var callId = 0;
var utils = {
      XHR               : function(method, ad, params) {
        // method	: GET or POST
        // ad		: adress of the ressource to be loaded
        // params : An object containing two possible parameters.
        //		- onload	: a function taking no argument, response will be contains in object this.
        //		- variables : an object containing a set of attribute<->value
        //		- form 		: a reference to a HTML form node
        return new Promise	( function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                if(typeof params === 'function') {
                    params = {onload: params};
                }
                if( typeof params === "object"
                    && !params.onload
                    && !params.form
                    && !params.variables) {params = { variables : params };}
                params = params || {};
                xhr.onloadend = function() {
                    if(params.onload) {params.onload.call(this);}
                    if	( this.status >= 400) {reject(this);} else {resolve(this);}
                }
                xhr.open(method, ad, true);
                console.log(method, ad, params);
                if(params.form || params.variables) {
                    var F = new FormData( params.form );
                    for(var i in params.variables) {
                        F.append(i, params.variables[i]);
                    }
                    xhr.send( F );
                } else {xhr.send();}
            }
        );
    }
    , initIO            : function() {
        this.io = this.io || io.apply(null, arguments);
    }
    , subscribeBrick	: function(brickId, eventName, cb) {
        var cbEventName = brickId + "::" + eventName;
        utils.io.emit	( "subscribeBrick"
            , { brickId		: brickId
                , eventName	: eventName
                , cbEventName	: cbEventName
            }
        );
        utils.io.on	( cbEventName, cb);
        return cbEventName;
    }
    , call	            : function(objectId, method, params, cb) {
        var call =	{ objectId	: objectId
            , method	: method
            , params	: JSON.stringify( params )
        };
        if(cb) {
            call.callId = callId++;
        }
        // console.log( "Calling", call);
        return new Promise	( function(resolve) {
            utils.io.emit	( 'call', call
                , function(data){
                    // console.log("Call", call.callId, " returns", data);
                    if(cb) {cb(data);}
                    resolve(data);
                }
            );
        });
    }
};

module.exports = utils;
