define([
    'underscore', 'jquery', 'backbone', 'react', 'platform/util',
    'text!myapp/schema/DummyBean.json',
    'platform/properties/PropertiesFormView'
], function (_, $, Backbone, React, util, sDummyBeanSchema, PropertiesFormView) {
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

        function renderForm(sel) {
            React.renderComponent(PropertiesFormView({
                typeMetadata: dummyBeanSchema,
                fieldMetadata: dummyBeanSchema.fields,
                fields: ['tmfItemId', 'tmfItemType', 'description', 'isCoreForLevel', 'modifiedDate'],
                model: model
            }), $(sel)[0]);
        }

        _.each(['[data-id="form1"]', '[data-id="form2"]'], renderForm);


        model.fetch();


        // Save reference to model for console debugging, e.g.
        //   window.model.add({'title': 'asfdasdf'})
        //   JSON.stringify(window.model.toJSON())
        //
        window.model = model;
    };

    return {
        entrypoint: entrypoint
    };
});