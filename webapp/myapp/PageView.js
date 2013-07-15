define([
    'underscore', 'react', 'platform/jsxutil',
    'myapp/form/MetadataView',
    'myapp/selector/SelectorView'
], function (_, React, jsxutil, MetadataView, SelectorView) {
    'use strict';


    return React.createClass({
        render: function () {
            console.assert(!!this.props.records);
            console.assert(this.props.selectedId !== undefined, 'selectedId must be provided but can be blank or null');
            console.assert(!!this.props.onFormSave);
            console.assert(!!this.props.onSelect);

            var scope = {
                Selector: SelectorView,
                MetadataView: MetadataView,
                selectedRecord: _.findWhere(this.props.records, { id: this.props.selectedId }) || {},
                records: this.props.records,
                selectedId: this.props.selectedId,
                onFormSave: this.props.onFormSave,
                onSelect: this.props.onSelect
            };
            return jsxutil.exec('<div><Selector records={records} onSelect={onSelect} /><MetadataView record={selectedRecord} onFormSave={onFormSave} /></div>', scope);
        }
    });

});