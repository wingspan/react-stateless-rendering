define([
    'underscore', 'jquery', 'backbone', 'react',
    'text!myapp/schema/DummyBean.json',
    'myapp/form/MetadataView',
    'myapp/selector/SelectorView'
], function (_, $, Backbone, React, sDummyBeanSchema, MetadataView, SelectorView) {
    'use strict';

    var dummyBeanSchema = JSON.parse(sDummyBeanSchema).data;

    function entrypoint() {

        var DummyBeanCollection = Backbone.Collection.extend({
            url: '/api/beans/DummyBean',
            parse: function (modelResponse) {
                return modelResponse.data;
            }
        });

        var beanCollecton = new DummyBeanCollection();
        var selectedIdModel = new Backbone.Model();


        function renderPage() {

            var records = beanCollecton.toJSON();
            var selectedId = selectedIdModel.get('selectedId') || '';
            var selectedRecord = (!!beanCollecton.get(selectedId)
                ? beanCollecton.get(selectedId).toJSON()
                : {});

            function renderForm($el) {
                React.renderComponent(MetadataView({
                    record: selectedRecord,
                    onFormSave: _.bind(console.log, console)
                }), $el);
            }

            function renderSelector($el) {
                React.renderComponent(SelectorView({
                    records: records,
                    onSelect: function (ormid) {
                        selectedIdModel.set('selectedId', ormid);
                    }
                }), $el);
            }

            function toEl(sel) { return $(sel)[0]; }

            ['[data-myapp-id="form"]'].map(toEl).map(renderForm);
            ['[data-myapp-id="selector"]'].map(toEl).map(renderSelector);

        }

        renderPage(beanCollecton.toJSON(), selectedIdModel.get('selectedId'));
        beanCollecton.on('sync', function () {
            renderPage(beanCollecton.toJSON(), selectedIdModel.get('selectedId'));
        });
        selectedIdModel.on('change:selectedId', function () {
            renderPage(beanCollecton.toJSON(), selectedIdModel.get('selectedId'));
        });
        beanCollecton.fetch();
    }

    return {
        entrypoint: entrypoint
    };
});