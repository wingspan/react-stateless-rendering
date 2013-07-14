/*
 * This is an example build file that demonstrates how to use the build system for
 * require.js.
 *
 * THIS BUILD FILE WILL NOT WORK. It is referencing paths that probably
 * do not exist on your machine. Just use it as a guide.
 *
 *
 */
({
    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: './webapp',

    //Set paths for modules. If relative paths, set relative to baseUrl above.
    //If a special value of "empty:" is used for the path value, then that
    //acts like mapping the path to an empty file. It allows the optimizer to
    //resolve the dependency to path, but then does not include it in the output.
    //Useful to map module names that are to resources on a CDN or other
    //http: URL when running in the browser and during an optimization that
    //file should be skipped because it has no dependencies.
    paths: {
        text: 'vendor/require-text-2.0.4',
        css: 'vendor/require-css-0.3.1',
        underscore: 'vendor/underscore-1.4.4',
        'underscore-string': 'vendor/underscore-string-2.3.0',
        jquery: 'vendor/jquery-1.9.1',
        mockjax: 'vendor/mockjax-1.5.2-SNAPSHOT',
        backbone: 'vendor/backbone-1.0.0',
        kendo: 'vendor/kendo/js/kendo.ui-complete-2013.1.514',
        knockout: 'vendor/knockout-2.2.1',
        knockback: 'vendor/knockback-0.17.2',
        moment: 'vendor/moment-2.0.0',
        flexpaper: 'vendor/flexpaper/flexpaper-2.1.2',
        nicescroll: 'vendor/jquery-nicescroll-3.4.1',
        plupload: 'vendor/plupload-1.5.7/plupload',
        'plupload-html4': 'vendor/plupload-1.5.7/plupload.html4',
        'plupload-html5': 'vendor/plupload-1.5.7/plupload.html5',
        'plupload-flash': 'vendor/plupload-1.5.7/plupload.flash',
        react: 'vendor/react',
        jsx: 'vendor/jsx',
        'react-backbone': 'vendor/wingspan/react-backbone',

        // r.js (Require optimizer) version 2.1.8 (latest as of 07/2013) can process this file correctly (it detects that it has
        // already been optimized and includes it as-is), but the version of r.js used by the gradle task 2.1.5 cannot handle it
        // For now I'm excluding JSXTransformer while I work up a better solution.
//        JSXTransformer: 'vendor/JSXTransformer',
        JSXTransformer: 'empty:',

        // These items do not exist in the project, they are dependencies of JSXTransformer.  JSXTransformer embeds these
        // dependencies, but the require optimizer still looks for them (and fails).  'empty:' is a special directive to
        // require here, telling it to effectively ignore these resources.
        'base64-vlq': 'empty:',
        'base64': 'empty:',
        'util': 'empty:',
        'array-set': 'empty:',
        'binary-search': 'empty:',
        'source-map-generator': 'empty:'
    },

    //Configure CommonJS packages. See http://requirejs.org/docs/api.html#packages
    //for more information.
    packages: [],

    //If shim config is used in the app during runtime, duplicate the config
    //here. Necessary if shim config is used, so that the shim's dependencies
    //are included in the build. Using "mainConfigFile" is a better way to
    //pass this information though, so that it is only listed in one place.
    //However, if mainConfigFile is not an option, the shim config can be
    //inlined in the build config.
    shim: {
        'underscore': { deps: [], exports: '_' },
        'underscore-string': { deps: ['underscore'] },
        'jquery': { deps: [], exports: '$' },
        'mockjax': { deps: ['jquery'] },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
        'kendo': { deps: ['jquery'], exports: 'kendo' },
        'knockout': { deps: ['jquery'], exports: 'ko' },
        'knockback': { deps: ['backbone', 'knockout'], exports: 'kb' },
        'moment': { deps: [], exports: 'moment' },
        'flexpaper': { deps: ['jquery'], exports: '$FlexPaper' },
        'nicescroll': { deps: ['jquery'], exports: 'NiceScroll' },
        'JSXTransformer': { exports: 'JSXTransformer' }
    },

    //How to optimize all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code.
    //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: 'uglify2',

    //If using UglifyJS for script optimization, these config options can be
    //used to pass configuration values to UglifyJS.
    //See https://github.com/mishoo/UglifyJS for the possible values.
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: true,
        max_line_length: 1000,

        //How to pass uglifyjs defined symbols for AST symbol replacement,
        //see "defines" options for ast_mangle in the uglifys docs.
        defines: {
            DEBUG: ['name', 'false']
        },

        //Custom value supported by r.js but done differently
        //in uglifyjs directly:
        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
        no_mangle: true
    },

    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,

    //Allow "use strict"; be included in the RequireJS files.
    //Default is false because there are not many browsers that can properly
    //process and give errors on code for ES5 strict mode,
    //and there is a lot of legacy code that will not work in strict mode.
    useStrict: false,

    //Skip processing for pragmas.
    skipPragmas: true,

    //List the modules that will be optimized. All their immediate and deep
    //dependencies will be included in the module's file when the build is
    //done. If that module or any of its dependencies includes i18n bundles,
    //only the root bundles will be included unless the locale: section is set above.
    name: 'vendor/wingspan/require-optimizer',

    //By default, comments that have a license in them are preserved in the
    //output. However, for a larger built files there could be a lot of
    //comment files that may be better served by having a smaller comment
    //at the top of the file that points to the list of all the licenses.
    //This option will turn off the auto-preservation, but you will need
    //work out how best to surface the license information.
    preserveLicenseComments: true,

    //Sets the logging level. It is a number. If you want "silent" running,
    //set logLevel to 4. From the logger.js file:
    //TRACE: 0,
    //INFO: 1,
    //WARN: 2,
    //ERROR: 3,
    //SILENT: 4
    //Default is 0.
    logLevel: 0
})
