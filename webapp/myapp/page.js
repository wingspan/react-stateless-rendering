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
            onFormSave: function(formVal) {
                alert(JSON.stringify(formVal));
            },
            onSelect: function (ormid) {
                // since we don't have mutable state (events on mutable models), we must use recursion to re-render.
                // use _defer to truncate the call stack since we don't have tail-call optimization
                var thunk = _.partial(renderPage, records, ormid);  // OMG recursion!
                _.defer(thunk);
            }
        }), $('[data-myapp-id="root"]')[0]);

    }

    return {
        entrypoint: entrypoint
    };
});