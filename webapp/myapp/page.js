define([
    'underscore', 'jquery', 'backbone', 'react', 'platform/jsxutil',
    'text!myapp/schema/DummyBean.json',
    'myapp/PageView'
], function (_, $, Backbone, React, jsxutil, sDummyBeanSchema, PageView) {
    'use strict';


    function entrypoint() {

        // Render the page right away (before any models are loaded), and re-render
        // if any page state changes.
        //
        renderPageFromModels();
        beanCollecton.on('sync', renderPageFromModels);
        selectedIdModel.on('change:selectedId', renderPageFromModels);
        beanCollecton.fetch();
    }


    // The models contain exactly the information/state necessary to render the entire page.
    // Page rendering is stateless, which means we need to extract the values out of the model; we
    // are working with javascript arrays and objects, not backbone collections and models.
    //
    function renderPageFromModels() {
        renderPage(beanCollecton.toJSON(), selectedIdModel.get('selectedId') || '');
    }


    // the page uses backbone models for all mutable state. DummyBean is a restful resource which has
    // a particular schema.
    //
    var DummyBeanCollection = Backbone.Collection.extend({
        url: '/api/beans/DummyBean',
        parse: function (modelResponse) {
            return modelResponse.data;
        }
    });


    // By default the models will be constructed, but empty, which is a legal and renderable state.
    //
    var beanCollecton = new DummyBeanCollection();
    var selectedIdModel = new Backbone.Model();


    // React entry point is a single div. All React rendering underneath this div has no knowledge
    // of any state, outside of what is passed into the function as arguments.
    //
    function renderPage(records, selectedId) {

        React.renderComponent(PageView({
            records: records,
            selectedId: selectedId,
            onFormSave: _.bind(console.log, console),
            onSelect: function (ormid) {
                selectedIdModel.set('selectedId', ormid);
            }
        }), $('[data-myapp-id="root"]')[0]);

    }

    return {
        entrypoint: entrypoint
    };
});