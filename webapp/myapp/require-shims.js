/* global require */
(function () {
    'use strict';

    require.config({
        paths: {
            text: 'vendor/require-text-2.0.4',
            underscore: 'vendor/underscore-1.4.4',
            'underscore-string': 'vendor/underscore-string-2.3.0',
            jquery: 'vendor/jquery-1.9.1',
            mockjax: 'vendor/mockjax-1.5.2-SNAPSHOT',
            backbone: 'vendor/backbone-1.0.0',
            kendo: 'vendor/kendo/js/kendo.web.min',
            react: 'vendor/react',
            jsx: 'vendor/jsx',
            JSXTransformer: 'vendor/JSXTransformer',
            'react-backbone': 'vendor/react-backbone'
        },
        shim: {
            'underscore': { deps: [], exports: '_' },
            'underscore-string': { deps: ['underscore'] },
            'jquery': { deps: [], exports: '$' },
            'mockjax': { deps: ['jquery'] },
            'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
            'kendo': { deps: ['jquery'], exports: 'kendo' },
            'react': { deps: [], exports: 'React'},
            'JSXTransformer': { exports: 'JSXTransformer' }
            //'react-backbone': { deps: ['react', 'backbone', 'underscore'] }
        }
    });
})();
