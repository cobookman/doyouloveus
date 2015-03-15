"use strict";

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        var params = this.getParams();
        return {
            name: params.name,
            amount: params.amount
        };
    },

    render: function() {
        return (
            <div className="container">
                <h2>
                    Thanks for subscribing to {this.state.name} for the amount of {this.state.amount}
                </h2>
            </div>
        );
    }
});
