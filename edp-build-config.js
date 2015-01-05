var epr = require( 'edp-provider-rider' );
var riderUI = require('rider-ui');
var transfer = require('rebas-transfer');
var c2a = require('c2a');

function stylusPlugin( style ) {
    style.use(epr.plugin());
    style.use(riderUI());
}

exports.stylus = epr.stylus;
exports.input = __dirname;

var path = require( 'path' );
exports.output = path.resolve( __dirname, 'output' );

exports.getProcessors = function () {
    var stylusProcessor = new StylusCompiler({
            stylus: epr.stylus,
            compileOptions: {
                use: stylusPlugin
            },
            files: [
                'src/common/app.styl'
            ]
        });
    var cssProcessor = new CssCompressor();
    var moduleProcessor = new ModuleCompiler();
    var jsProcessor = new JsCompressor({
        files: [
            'src/**/*.js',
            'dep/**/*.js'
        ]
    });
    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();

    var c2aHandler = c2a.edpBuild();

    var transferHandler = transfer.edpBuild();

    return {
        'default': [
            stylusProcessor,
            transferHandler.builder, c2aHandler.builder, moduleProcessor, c2aHandler.clear, transferHandler.clear,
            pathMapperProcessor
        ],
        'release': [
            stylusProcessor, cssProcessor,
            transferHandler.builder, c2aHandler.builder, moduleProcessor, c2aHandler.clear, transferHandler.clear,
            jsProcessor, pathMapperProcessor, addCopyright
        ]
    };
};

exports.exclude = [
    'tool',
    'doc',
    'test',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    'node_modules',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    'package.json',
    'README.md',
    '*.tmp',
    '*.bak',
    '*.swp'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

