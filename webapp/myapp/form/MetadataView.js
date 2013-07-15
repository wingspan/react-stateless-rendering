define([
    'underscore', 'jquery', 'react',
    'platform/controls/react/ReactControlFactory',
    'text!myapp/schema/DummyBean.json'
], function (_, $, React, ReactControlFactory, studyItemModelString) {
    'use strict';

    var modelSchema = JSON.parse(studyItemModelString).data;

    var Field = React.createClass({
        render: function () {
            console.assert(!!this.props.record);
            console.assert(!!this.props.fieldName);
            console.assert(!!this.props.metadata);

            var control = ReactControlFactory.build(this.props.fieldName, this.props.metadata, this.props.record);

            function onClickFieldLock(e) {
                $(e.target).toggleClass('fieldLockOn');
            }

            return (
                <div class="formField">
                    <label class="formLabel hasTooltip">
                        <span class="statusIcon">{this.props.fieldName}</span>
                    </label>
                    {control}
                    <div class="fieldLock" onClick={onClickFieldLock}></div>
                </div>
            );


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
                return (
                    <Field record={self.props.record}
                           fieldName={fieldName}
                           metadata={fieldInfo}
                           ref={fieldName} />
                );
            });

            return (<div class="content">{fieldsPseudoDom}</div>);
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

            return (
                <div>
                    <h1>Model Attributes</h1>
                    <MetadataForm record={this.props.record} ref="form" />
                    <h1>available actions</h1>
                    <ul>
                        <li><a href="#" onClick={this.onClickSave}>Save</a></li>
                    </ul>
                </div>
            );
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