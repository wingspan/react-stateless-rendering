define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil'
], function (_, $, React, kendo, jsxutil) {
    'use strict';


    return React.createClass({

        render: function () {
            return jsxutil.exec('<input />', {});
        },

        componentDidMount: function (rootNode) {
            console.assert(!!rootNode);
            var $el = $(rootNode);
            $el.kendoDateTimePicker({});
            $el.data('kendoDateTimePicker').value(new Date(this.props.value));

        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.value));
        }

    });

});