define([
    'underscore', 'jquery', 'react', 'platform/jsxutil', 'platform/util',
    'platform/controls/react/KendoText',
    'platform/controls/react/KendoBoolean',
    'platform/controls/react/KendoNumber',
    'platform/controls/react/KendoDatetime',
    'react-backbone'
], function (_, $, React, jsxutil, util,
             KendoText, KendoBoolean, KendoNumber, KendoDatetime) {
    'use strict';

    /**
     * metadata looks like this:
     *
     * {
                "name": "tmfItemId",
                "label": "ID",
                "dataType": "text",
                "placeholder": "100.02",
                "helpText": "Unique identifier for the List Item (####.##)",
                "array": false,
                "readonly": false,
                "required": true,
                "multiLine": false,
                "options": null,
                "maxLength": 32,
                "minLength": 32,
                "pattern": "^[a-zA-Z0-9]{1,5}\\.[a-zA-Z0-9]{1,3}$",
                "maxValue": null,
                "minValue": null,
                "decimals": 0,
                "stepValue": 1.0
            }
     *
     *
     *
     *
     * @param fieldName - attribute of the backbone model to bind to
     * @param metadata - js object in same shape as a FieldInfo
     * @param record - Backbone model to bind to, can be empty
     * @returns {*}
     */
    function build(fieldName, metadata, record) {
        var scope = {
            KendoText: KendoText,
            KendoBoolean: KendoBoolean,
            KendoNumber: KendoNumber,
            KendoDatetime: KendoDatetime,
            fieldName: fieldName,
            metadata: metadata,
            value: record[fieldName]
        };

        var dispatch = {
            text: '<KendoText value={value} fieldName={fieldName} ref={fieldName} />',
            //number: '<KendoNumber value={value} fieldName={fieldName} metadata={metadata} ref={fieldName} />',
            number: '<KendoText value={value} fieldName={fieldName} ref={fieldName} />',
            datetime: '<KendoDatetime value={value} fieldName={fieldName} ref={fieldName} />',
            boolean: '<KendoBoolean value={value} fieldName={fieldName} ref={fieldName} />',
            rawtext: '<input type="text" value={value} ref={fieldName} />'
        };

        var jsx = dispatch[metadata.dataType] || '<input type="text" value={metadata.dataType} />';
        return jsxutil.exec(jsx, scope);
    }

    return {
        build: build
    };
});