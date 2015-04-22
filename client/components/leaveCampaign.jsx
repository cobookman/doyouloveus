"use strict";

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {
            campaign: this.getParams().campaign,
            left: false
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: '/api/campaign/' + window.encodeURIComponent(this.state.campaign),
            type: 'DELETE'
        })
        .then(function() {
            this.setState({left: true});
        }.bind(this))
        .fail(function() {
            this.setState({error: true});
        }.bind(this));
    },
    render: function() {
        if(this.state.left) {
            return (
                <h2>
                    Successfully left
                    <span style={{fontStyle: 'italic', textDecoration: 'underline'}}>
                        {this.state.campaign}
                    </span>
                </h2>
            );
        }
        else if(this.state.error) {
            return (
                <h2>Error, Failed to leave</h2>
            );
        }
        else {
            return (
                <h2>Leaving....</h2>
            );
        }
    }
});
