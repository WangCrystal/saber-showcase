var route2js = require('route2js/lib/adapter/edp-webserver');

var epr = require( 'edp-provider-rider' );
var riderUI = require('rider-ui');

function stylusPlugin( style ) {
    style.use(epr.plugin());
    style.use(riderUI());
}
exports.stylus = epr.stylus;

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        {
            location: /\/[^.\/]*$/,
            handler: proxy('127.0.0.1', '8000')
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss({
                    stylus: {
                        use: stylusPlugin
                    }
                })
            ]
        },
        {
            location: /^[^\?]+?\.json\.js($|\?)/,
            handler: route2js()
        },
        {
            location: /\.tpl\.js($|\?)/,
            handler: [
                html2js()
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
