"use strict";

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {
            name: this.getParams().name,
            amount: 0
        };
    },
    render: function() {
        return (
            <h2>Love {this.state.name}</h2>
        );
    }
});
