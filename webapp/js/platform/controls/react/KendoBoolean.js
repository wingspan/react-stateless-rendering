/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';


    return React.createClass({

        render: function () {
            return (<span />);
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
        },

        value: React.autoBind(function () {
            return $(this.getDOMNode()).data('kendoDropDownList').value();
        })

    });

});