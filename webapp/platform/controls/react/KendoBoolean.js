define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil'
], function (_, $, React, kendo, jsxutil) {
    'use strict';


    return React.createClass({

        render: function () {
            return jsxutil.exec('<span />', {});
        },

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            $el.html('<input>').kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [ { text: 'Yes', value: 'true' }, { text: 'No', value: 'false' } ],
                index: 0
            });
            $el.data('kendoDropDownList').value(this.props.value);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode);
            $el.data('kendoDropDownList').value(this.props.value);
        }

    });

});