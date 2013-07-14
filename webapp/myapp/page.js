define([
    'underscore', 'jquery', 'backbone', 'react', 'platform/util',
    'text!myapp/schema/DummyBean.json',
    'myapp/form/MetadataView'
], function (_, $, Backbone, React, util, sDummyBeanSchema, MetadataView) {
    'use strict';

    var dummyBeanSchema = JSON.parse(sDummyBeanSchema).data;

    function entrypoint() {

        var DummyBean = Backbone.Model.extend({
            urlRoot: '/api/beans/DummyBean',
            parse: function(modelResponse) {
                return modelResponse.data;
            }
        });

        var model = new DummyBean({id: '8439112E-806C-11E2-B0ED-B4BDF046605F'});

        var $el = $('[data-id="form1"]')[0];

        function renderForm() {
            React.renderComponent(MetadataView({
                record: model.toJSON(),
                onFormSave: _.bind(console.log, console)
            }), $el);
        }

        renderForm();
        model.on('sync', renderForm);
        model.fetch();


        // Save reference to model for console debugging, e.g.
        //   window.model.add({'title': 'asfdasdf'})
        //   JSON.stringify(window.model.toJSON())
        //
        window.model = model;
    }

    return {
        entrypoint: entrypoint
    };
});