/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';


    var SelectorView = React.createClass({
        render: function () {
            console.assert(!!this.props.records);
            console.assert(!!this.props.onSelect);
            var self = this;

            var items = this.props.records.map(function (record) {

                function onClick(e) {
                    void e;
                    self.props.onSelect(record.id);
                    return false;
                }

                return (
                    <li><a href="#" onClick={onClick}>{record.id}</a></li>
                );
            });

            return (
                <div>
                    <h1>Model Selector</h1>
                    <ul>
                    {items}
                    </ul>
                </div>
            );
        }
    });


    return SelectorView;
});