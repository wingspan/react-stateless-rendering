define([
    'underscore', 'react',
    'jsx!myapp/form/MetadataView',
    'jsx!myapp/selector/SelectorView'
], function (_, React, MetadataView, SelectorView) {
    'use strict';


    return React.createClass({
        render: function () {
            console.assert(!!this.props.records);
            console.assert(this.props.selectedId !== undefined, 'selectedId must be provided but can be blank or null');
            console.assert(!!this.props.onFormSave);
            console.assert(!!this.props.onSelect);

            var selectedRecord = _.findWhere(this.props.records, { id: this.props.selectedId }) || {};

            return (
                <div>
                    <SelectorView records={this.props.records} onSelect={this.props.onSelect} />
                    <MetadataView record={selectedRecord} onFormSave={this.props.onFormSave} />
                </div>
            );
        }
    });

});