define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil'
], function (_, $, React, kendo, jsxutil) {
    'use strict';

    return React.createClass({

        render: function () {
            console.assert(!!this.props.value);
            console.assert(!!this.props.metadata);

            return jsxutil.exec('<span />', {});
        },

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            $el.kendoNumericTextBox({
                format: 'n' + this.props.metadata.decimals,
                min: this.props.metadata.minValue,
                max: this.props.metadata.maxValue,
                step: this.props.metadata.stepValue
            });
            $el.data('kendoNumericTextBox').value(this.props.value);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode);
            $el.data('kendoNumericTextBox').value(this.props.value);
        }



    });

});