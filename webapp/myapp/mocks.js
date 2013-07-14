define([
    'underscore', 'jquery',
    'underscore-string', 'mockjax'
], function (_, $) {
    'use strict';

    /**
     * Installing and uninstalling mocks at runtime should probably
     * require a page refresh, so that all requests come from a
     * consistent application state.
     */
    function install() {

        _.extend($.mockjaxSettings, {
            responseTime: 0,
            contentType: 'text/json',
            logging: true
        });


        $.mockjax(function(settings) {
            // settings.url == '/api/types/DummyBean'
            var service = settings.url.match(/\/api\/types\/(.*)$/)   //  ["/api/types/DummyBean", "DummyBean"]
            if (service) {
                var typeName = service[1];
                return {
                    contentType: 'text/json',
                    responseTime: 100,
                    proxy: _.str.sprintf('mocks/%s.json', typeName)
                };
            }
            return;
        });

        $.mockjax(function(settings) {

            var service = settings.url.match(/\/api\/beans\/DummyBean\/(.*)$/)   //  ["/api/types/DummyBean", "DummyBean"]
            var type = settings.type.toLowerCase();

            if (service && type === 'get') {
                var beanId = service[1];
                return {
                    type: 'GET',
                    contentType: 'text/json',
                    responseTime: 1000,
                    proxy: _.str.sprintf('mocks/DummyBean_%s.json', beanId)
                };
            }
            return;
        });

    }


    function uninstall() {
        $.mockjaxClear();
    }


    return {
        install: install,
        uninstall: uninstall
    }

});