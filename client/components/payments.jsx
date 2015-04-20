/* global Stripe */
"use strict";

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Plan = require('./plan');
var plans = require('../plans');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {
            pendingAuth: false,
            error: null,
            addedCustomer: false
        };
    },
    componentWillMount: function() {
        // load stripe script
        var s = document.createElement('script');
        s.src = 'https://js.stripe.com/v2/';
        s.type = 'text/javascript';
        s.onload = s.onreadystatechange = function() {
            if(window.location.hostname === 'localhost') {
                Stripe.setPublishableKey('pk_test_Tn8scBekhDckaNpBhYXNWtwm');
            }
            else {
                Stripe.setPublishableKey('pk_live_jYt4ZrKVtHQGXurhn7pMTN6w');
            }
        };
        document.head.appendChild(s);
    },
    onSubmit: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $form = $(e.target);
        Stripe.card.createToken($form, this.onStripeResponse);
        this.setState({pendingAuth: true, error: null });
    },
    onStripeResponse: function(status, response) {
        this.setState({pendingAuth: false});

        if(response.error) {
            this.setState({error: response.error.message});
            return;
        }

        $.post('/api/payments', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            campaign_name: this.state.campaign_name,
            twitter_username: this.state.twitter_username,
            email: this.state.email,
            token: response.id,
            coupon: this.state.coupon
        })
        .then(function() {
            this.setState({error: false, addedCustomer: true });
        }.bind(this))
        .fail(function(err) {
            this.setState({error: err});
        }.bind(this));
    },
    handleChange: function(field, e) {
        var change = {};
        change[field] = e.target.value;
        this.setState(change);
    },
    renderFormComponent: function(data) {
        return (
            <div className="form-group">
                <label for={data.id} className="col-sm-2 control-label">{data.label}</label>
                <div className="col-sm-10">
                    <input
                        type={data.type}
                        className="form-control"
                        id={data.id}
                        placeholder={data.placeholder}
                        data-stripe={data.stripe}
                        onChange={this.handleChange.bind(this, data.id)}/>
                </div>
            </div>
        );
    },

    renderForm: function() {
        var alerts;

        if(this.state.error) {
            alerts = (
                <div className="alert alert-danger">{this.state.error}</div>
            );
        }
        var planName = this.getParams().plan;
        var planDetails = plans[planName];
        return (
            <div className="row">
                <form id="payment-form" className="form-horizontal col-md-8" onSubmit={this.onSubmit}>
                    <h2>Submit your Payment Information</h2>
                    {alerts}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'first_name',
                        label: 'First Name',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'last_name',
                        label: 'Last Name',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'email',
                        id: 'email',
                        label: 'Email Address',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'twitter_username',
                        label: 'Twitter Username',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'campaign_name',
                        label: 'Campaign Name',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'card-number',
                        label: 'Credit Card Number',
                        stripe: 'number'
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'cvc-number',
                        label: 'CVC',
                        stripe: 'cvc'
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'coupon',
                        label: 'Coupon Code',
                        stripe: 'coupon'
                    })}
                    <div className="form-group">
                        <label htmlFor="expiration" className="col-sm-2 control-label">Expiration (MM/YYYY)</label>
                        <div className="col-sm-10">
                            <input type="text" size="2" data-stripe="exp-month"/>
                            <span> / </span>
                            <input type="text" size="4" data-stripe="exp-year"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" style={{disabled: this.state.pendingAuth}}>Submit Payment</button>
                        </div>
                    </div>
                </form>
                <div className="col-md-3">
                    <h3>Plan Overview</h3>
                    <Plan
                        name={planName}
                        price={planDetails.price}
                        tweets={planDetails.tweets} >
                    </Plan>
                </div>
            </div>
        );
    },
    render: function() {
        if(!this.state.addedCustomer) {
            return this.renderForm();
        }
        else {
            var url = 'http://' + window.location.host + '/love/' + window.encodeURIComponent(this.state.campaign_name);
            return (
                <div>
                    <h2>Thank you, you have successfully added your campaign</h2>
                    <p>
                        Send the following link to your subscribers:
                        <a href={url}>{url}</a>
                    </p>
                </div>
            );
        }
    }
});
