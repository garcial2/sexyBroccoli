require( "angular-material/angular-material.css" );
require( "./m1m-client.css" );

var angular						= require( "angular" ),
	m1mClientMultimediaModule	= require( "./Components/m1m-multimedia-manager/m1m-multimedia-manager.js" )
	;

angular	.module( "m1m-client-Module", [m1mClientMultimediaModule] );
