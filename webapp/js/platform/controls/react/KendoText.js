/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';


    return React.createClass({

        render: function () {
            return (<input type="text" class="k-textbox" value={this.props.value} />);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).val(this.props.value);
        },

        value: React.autoBind(function () {
            return this.getDOMNode().value;
        })

    });

});