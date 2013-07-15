# Functional programming against the DOM with React

* no Backbone models
* no Knockout viewmodels
* referentially transparent programming model - no mutable state at all, unless you choose it
* imperative-style widget library (with mutable state) wrapped into functional-style programming model

[Live demo](https://rawgithub.com/dustingetz/react-stateless-rendering/master/webapp/test.html)

## how to run locally

* npm install -g react-tools
* `jsx --watch js js-built`
* python -m SimpleHTTPServer 8001       (from project root)
* navigate to `http://localhost:8001/webapp/test.html`
