/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';


    return React.createClass({

        render: function () {
            return (<input />);
        },

        componentDidMount: function (rootNode) {
            console.assert(!!rootNode);
            var $el = $(rootNode);
            $el.kendoDateTimePicker({});
            $el.data('kendoDateTimePicker').value(new Date(this.props.value));

        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.value));
        },

        value: React.autoBind(function () {
            return $(this.getDOMNode()).data('kendoDateTimePicker').value();
        })

    });

});