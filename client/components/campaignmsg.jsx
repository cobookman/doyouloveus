"use strict";

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var forceAuth = require('../utils/forceAuth');
var formatDate = require('../utils/formatDate');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        var params = this.getParams();
        return {
            message: '',
            campaign: params.name
        };
    },
    componentWillMount: function() {
        forceAuth();
    },
    componentDidMount: function() {
        $.get('/api/campaign/' + encodeURIComponent(this.state.campaign))
            .then(function(data) {
                this.setState({info: data});
            }.bind(this))
            .fail(function() {
                console.log(new Error("Failed to grab campaign information"));
            });
    },
    updateMessage: function(e) {
        this.setState({
            message: e.target.value.replace(/\#|\@|&#35;|&#64;/g, '')
        });
    },
    sendMsg: function(e) {
        e.preventDefault();
        e.stopPropagation();

        $.post('/api/queue/' + this.state.campaign, { message: this.state.message })
            .then(function() {
                alert("SENT");
            })
            .fail(function(err) {
                window.p = arguments;
                err = err.responseJSON;
                alert(err.message);
            });
    },
    renderInfo: function() {
        if(!this.state.info) {
            return null;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Information on campaign `{this.state.info.campaign.name}`
                    </h3>
                </div>
                <div className="panel-body">
                    <ul>
                        <li>Subscribers: {this.state.info.subscriptions.length}</li>
                        <li>Last Message Sent: {formatDate(new Date(this.state.info.campaign.last_sent_msg))}</li>
                        <li>Plan: {this.state.info.campaign.plan}</li>
                    </ul>
                </div>
            </div>
        );
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <h2>
                        Send out a campaign message to <span style={{fontStyle: 'italic', textDecoration: 'underline'}}>{this.state.campaign}</span> subscribers
                    </h2>
                    {this.renderInfo()}
                </div>
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label htmlFor="message" style={{fontSize: '1.5em'}}>Message</label>
                            <p>
                                No @ or # symbols are allowed in your message.  This is to be a good
                                twitter citizen, and prevent spam.
                            </p>
                            <textarea
                                id="message"
                                rows="5"
                                style={{width: '100%'}}
                                value={this.state.message}
                                onChange={this.updateMessage}>
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-default"
                            onClick={this.sendMsg}>

                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
});
