define([
    'underscore', 'react', 'JSXTransformer',
    'underscore-string'
], function (_, React, jsxt) {
    'use strict';


    /**
     * Performs black magic to macroexpand the JSXT inline.
     *
     * @param jsxCode
     * @returns a string that contains the final macroexpanded javascript code
     */
    function macroexpand(jsxCode, scope) {
        // We have to tag JSX source code with a special comment or the JSX parser will ignore it.
        var preamble = '/** @jsx React.DOM */';
        var wrappedCode = preamble + '\n' + jsxCode;

        // Perform the macro expansion.
        return jsxt.transform(wrappedCode).code;
    }


    /**
     * Macroexpand and then evaluate a JSX snippet, passed as a string, inside a lexical scope
     * which is passed as a map.
     *
     * @param jsxCode
     * @param lexicalScope
     * @returns the result of the evaluated JSX expression.
     */
    function exec(jsxCode, lexicalScope) {
        // Macroexpand the JSX source code.
        var code = macroexpand(jsxCode);

        // Wrap the expanded source code into a function, so we can control
        // the this pointer and lexical scope using macros.
        //
        var thunkTemplate = [
            '(function () {        ',
            '    %s                ',   // variables will be written into lexical scope here
            '    return (          ',
            '        %s            ',   // JSX macroexpansion will be written here
            '    );                ',
            '})                    '
        ].join('\n');


        // Build a macro to inject some vars into lexical scope, making sure to preserve references.
        //
        var lexicalVarTemplate = 'var %s = lexicalScope.%s;';
        var lexicalVars = _.map(lexicalScope, function (val, key) {
            return _.str.sprintf(lexicalVarTemplate, key, key);
        });

        /**
         * Glue everything together. The final thunk looks like this:
         *
         *    function () {
         *        var TodoItemView = lexicalScope.TodoItemView;
         *        var todo = lexicalScope.todo;
         *        return (
         *            TodoItemView( {model:todo}, null )
         *        );
         *    }
         */
        var thunkCode = _.str.sprintf(thunkTemplate, lexicalVars.join('\n'), code);

        /* jslint evil: true */
        var thunk = eval(thunkCode);

        // Evaluate the thunk.
        return thunk.apply(null);
    }

    return {
        macroexpand: macroexpand,
        exec: exec
    };
});