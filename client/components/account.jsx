"use strict";

var React = require('react');
var $ = require('jquery');
var forceAuth = require('../utils/forceAuth');
var formatDate = require('../utils/formatDate');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        forceAuth();

        $.get('/api/account')
            .then(function(info) {
                this.setState({user: info});
            }.bind(this))
            .fail(function() {
                this.setState({error: "Failed to grab user information :("});
            }.bind(this));
    },
    renderUserInfo: function() {
        var campaigns = this.state.user.campaigns.map(function(campaign) {
            return (
                <tr>
                    <td>{campaign.name}</td>
                    <td>{campaign.description}</td>
                    <td>{formatDate(new Date(campaign.last_sent_msg))}</td>
                    <td>{formatDate(new Date(campaign.created_at))}</td>
                </tr>
            );
        }.bind(this));

        var subscriptions = this.state.user.subscriptions.map(function(subscription) {
            return (
                <tr>
                    <td>{subscription.campaign}</td>
                    <td>{formatDate(new Date(subscription.created_at))}</td>
                    <td>{formatDate(new Date(subscription.expires_at))}</td>
                </tr>
            );
        }.bind(this));

        return (
            <div className="row">
                <h2>Account information for @{window.user.twitter_username}</h2>
                <div className="panel panel-default">
                    <div className="panel-heading">Campaigns you are in charge of</div>
                    <table className="table">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Last Sent Msg</th>
                            <th>Creation Date</th>
                        </thead>
                        <tbody>
                            {campaigns}
                        </tbody>
                    </table>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Subscriptions to campaigns you have joined</div>
                    <table className="table">
                        <thead>
                            <th>Campaign</th>
                            <th>Joined On</th>
                            <th>Expires On</th>
                        </thead>
                        <tbody>
                            {subscriptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },
    renderError: function() {
        return (
            <h2 style={{color: 'red'}}>Error: {this.state.error}</h2>
        );
    },
    render: function() {
        if(this.state.user) {
            return this.renderUserInfo();
        }
        else if(this.state.error) {
            return this.renderError();
        }
        else {
            return (
                <h2>Loading....</h2>
            );
        }
    }
});
