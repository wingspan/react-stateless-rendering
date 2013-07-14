/* global require */
(function () {
    'use strict';

    require.config({
        paths: {
            text: 'vendor/require-text-2.0.4',
            css: 'vendor/require-css-0.3.1',
            underscore: 'vendor/underscore-1.4.4',
            'underscore-string': 'vendor/underscore-string-2.3.0',
            jquery: 'vendor/jquery-1.9.1',
            mockjax: 'vendor/mockjax-1.5.2-SNAPSHOT',
            backbone: 'vendor/backbone-1.0.0',
            kendo: 'vendor/kendo-2013.1.514/js/kendo.web.min',
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
            JSXTransformer: 'vendor/JSXTransformer',
            'react-backbone': 'vendor/wingspan/react-backbone'
        },
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
            'plupload': { deps: ['jquery'], exports: 'plupload' },
            'plupload-html4': { deps: ['jquery', 'plupload'] },
            'plupload-html5': { deps: ['jquery', 'plupload'] },
            'plupload-flash': { deps: ['jquery', 'plupload'] },
            'react': { deps: [], exports: 'React'},
            'JSXTransformer': { exports: 'JSXTransformer' }
            //'react-backbone': { deps: ['react', 'backbone', 'underscore'] }
        }
    });
})();
