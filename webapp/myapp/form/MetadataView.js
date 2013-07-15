define([
    'underscore', 'jquery', 'react', 'platform/jsxutil',
    'platform/controls/react/ReactControlFactory',
    'text!myapp/form/metadata.jsx.html',
    'text!myapp/form/field.jsx.html',
    'text!myapp/schema/DummyBean.json'
], function (_, $, React, jsxutil, ReactControlFactory, metadataJsx, fieldJsx, studyItemModelString) {
    'use strict';

    var modelSchema = JSON.parse(studyItemModelString).data;

    var Field = React.createClass({
        render: function () {
            console.assert(!!this.props.record);
            console.assert(!!this.props.fieldName);
            console.assert(!!this.props.metadata);

            var scope = {
                helpTextLabel: 'l10n: Instruction Text',

                fieldName: this.props.fieldName,
                helpText: this.props.metadata.helpText,
                control: ReactControlFactory.build(this.props.fieldName, this.props.metadata, this.props.record),
                //control: wspt.jsxutil.exec('<input type="text" value={id} />', { id: this.props.record.id }),
                onClickFieldLock: function (e) {
                    $(e.target).toggleClass('fieldLockOn');
                }
            };
            return jsxutil.exec(fieldJsx, scope);
        },

        value: React.autoBind(function () {
            void this;
            return this.refs[this.props.fieldName].value();
        })
    });


    var MetadataForm = React.createClass({
        render: function () {
            console.assert(!!this.props.record);
            var self = this;

            var fieldsPseudoDom = _.map(modelSchema.fields, function (fieldInfo, fieldName) {
                var scope = {
                    Field: Field,
                    fieldName: fieldName,
                    record: self.props.record,
                    metadata: fieldInfo
                };
                return jsxutil.exec('<Field record={record} fieldName={fieldName} metadata={metadata} ref={fieldName} />', scope);
            });

            var scope = {
                fields: fieldsPseudoDom
            };
            return jsxutil.exec('<div class="content">{fields}</div>', scope);   // how do i avoid spurious div?
        },

        value: React.autoBind(function (e) {
            var self = this;

            var vals = _.object(_.keys(modelSchema.fields).map(function (fieldName) {
                return [fieldName, self.refs[fieldName].value()];
            }));

            return vals;
        })
    });


    var MetadataView = React.createBackboneClass({
        render: function () {
            console.assert(!!this.props.record);
            console.assert(!!this.props.onFormSave);

            var scope = {
                MetadataForm: MetadataForm,
                record: this.props.record,
                onFormSave: this.onClickSave
            };
            return jsxutil.exec(metadataJsx, scope);
        },

        onClickSave: React.autoBind(function (e) {
            void e;
            var formVal = this.refs.form.value();
            this.props.onFormSave(formVal);
            return false;
        })
    });


    return MetadataView;
});