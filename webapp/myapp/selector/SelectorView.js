define([
    'underscore', 'jquery', 'react', 'platform/jsxutil',
    'text!myapp/selector/selector.jsx.html'
], function (_, $, React, jsxutil, selectorJsx) {
    'use strict';





    var SelectorView = React.createClass({
        render: function () {
            console.assert(!!this.props.records);
            console.assert(!!this.props.onSelect);
            var self = this;

            var items = this.props.records.map(function (record) {
                var scope = {
                    id: record.id,
                    onClick: function (e) {
                        self.props.onSelect(record.id);
                        return false;
                    }
                };
                return jsxutil.exec('<li><a href="#" onClick={onClick}>{id}</a></li>', scope);
            });


            var scope = {
                items: items
            };
            return jsxutil.exec(selectorJsx, scope);
        }
    });


    return SelectorView;
});