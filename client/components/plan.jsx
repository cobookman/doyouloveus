'use strict';
var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="pricingBox">
                <h3>{this.props.name}</h3>
                <h1>${this.props.price}</h1>
                <h3>{this.props.tweets} tweets</h3>
                <a href={"/payments/" + this.props.name}>Sign Up</a>
            </div>
        );
    }
});
