var transfer = require('rebas-transfer');
var c2a = require('c2a');

var transfer = require('rebas-transfer');

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
            location: /^\/route\/.*\.json\.js(:?$|\?)/,
            handler: transfer.edpWebserver('json/route')
        },
        {
            location: /^\/tpl\/.*\.json\.js(:?$|\?)/,
            handler: transfer.edpWebserver('json/tpl')
        },
        {
            location: /\.tpl\.js($|\?)/,
            handler: transfer.edpWebserver('template')
        },
        {
            location: /^\/tpl\/.*\.js(:?$|\?)/,
            handler: c2a.edpWebserver()
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
