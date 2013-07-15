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
        renderPage([], '');

        $.getJSON('/api/beans/DummyBean').done(function (response) {
            renderPage(response.data, '');
        });
    }



    // React entry point is a single div. All React rendering underneath this div has no knowledge
    // of any state, outside of what is passed into the function as arguments.
    //
    function renderPage(records, selectedId) {
        selectedId = selectedId || '';

        React.renderComponent(PageView({
            records: records,
            selectedId: selectedId,
            onFormSave: _.bind(console.log, console),
            onSelect: function (ormid) {
                _.defer(_.partial(renderPage, records, ormid));  // OMG recursion!
            }
        }), $('[data-myapp-id="root"]')[0]);

    }

    return {
        entrypoint: entrypoint
    };
});