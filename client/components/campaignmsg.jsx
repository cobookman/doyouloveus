"use strict";

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var forceAuth = require('../utils/forceAuth');

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
    updateMessage: function(e) {
        this.setState({
            message: e.target.value
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
    render: function() {
        return (
            <div className="container">
                <h2>
                    Send out a campaign message
                </h2>
                <div className="row">
                    <form>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
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
