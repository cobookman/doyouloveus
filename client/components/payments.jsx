/* global Stripe */
"use strict";

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Plan = require('./plan');
var plans = require('../plans');
var forceAuth = require('../utils/forceAuth');
var coupons = require('../coupons');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {

        return {
            disableForm: false,
            pendingAuth: false,
            error: null,
            addedCustomer: false,
            showCouponInput: false,
            campaign_description: [
                "Hey Supporters,",
                "We need your support. Every month we do one new PR, press, or blog posts By opting in with your twitter account, you're supporting us. We'll automagically push the post to your feed once a month.",
                "All the posts are screened by DoYouLoveUs.com. Instead of having to bug you every month to share something and you having to login to twitter and copy-paste the stuff, just click the button below and it will all happen automagically.",
                "You have the option of choosing 1,3, or 12 months of support. The more the merrier!"
            ].join('\n'),
            plan: this.getParams().plan
        };
    },
    componentWillMount: function() {
        forceAuth();

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

        if(this.state.disableForm) {
            return; // disregard multiple form submissions until server gets back to us
        }

        var $form = $(e.target);
        Stripe.card.createToken($form, this.onStripeResponse);
        this.setState({pendingAuth: true, error: null, disableForm: true });
    },
    getName: function() {
        var parts = window.user.displayName.split(' ');
        if(parts.length >= 2) {
            return {
                first_name: parts[0],
                last_name: parts[1]
            };
        }
        else {
            return {
                first_name: window.user.displayName,
                last_name: ''
            };
        }
    },
    onStripeResponse: function(status, response) {
        if(response.error) {
            this.setState({error: response.error.message, disableForm: false});
            return;
        }

        var name = this.getName();

        $.post('/api/payments', {
            first_name: name.first_name,
            last_name: name.last_name,
            campaign_name: this.state.campaign_name,
            campaign_description: this.state.campaign_description,
            twitter_username: window.user.twitter_username,
            email: this.state.email,
            token: response.id,
            coupon: this.state.coupon,
            plan: this.state.plan
        })
        .then(function() {
            this.setState({error: false, addedCustomer: true, disableForm: false, pendingAuth: false });
        }.bind(this))
        .fail(function(err) {
            this.setState({error: err, disableForm: false, pendingAuth: false});
        }.bind(this));
    },
    handleChange: function(field, e) {
        var change = {};
        change[field] = e.target.value;
        if(field === 'coupon') {
            change[field] = change[field].trim();
        }
        this.setState(change);
    },
    renderFormComponent: function(data) {
        return (
            <div className="form-group" style={data.style || {}}>
                <label htmlFor={data.id} className="col-sm-2 control-label">{data.label}</label>
                <div className="col-sm-10">
                    <input
                        type={data.type}
                        className="form-control"
                        id={data.id}
                        placeholder={data.placeholder}
                        data-stripe={data.stripe}
                        onChange={this.handleChange.bind(this, data.id)}
                        disable={this.state.disableForm} />
                </div>
            </div>
        );
    },
    renderMonthDropdownOptions: function() {
        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        var output = [];
        for(var i = 0, l = months.length; i < l; ++i) {
            var monthName = months[i];
            var monthDigit = '' + (i + 1);
            if(i < 10) {
                monthDigit = '0' + monthDigit;
            }

            output.push((
                <option value={i+1}>{monthDigit} - {monthName}</option>
            ));
        }
        return output;
    },
    showCoupon: function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({showCouponInput: true});
    },
    renderCoupon: function() {
        if(this.state.showCouponInput) {
            var style = {};
            if(this.state.coupon && this.state.coupon.length) {
                style.color = '#DA0101';
            }

            var label = 'Coupon Code';
            if(this.state.coupon && coupons[this.state.coupon]) {
                style.color = '#007E00';
                label += '\n' + ((1 - coupons[this.state.coupon]) * 100) + '% off';
            }
            return this.renderFormComponent({
                type: 'text',
                id: 'coupon',
                label: label,
                stripe: 'coupon',
                style: style
            });
        }
        else {
            return (
                <div className="form-group">
                    <button
                        onClick={this.showCoupon}
                        className="col-sm-offset-2 btn btn-default"
                        style={{marginBottom: '1em'}}>

                        Add Coupon Code
                    </button>
                </div>
            );
        }
    },
    renderForm: function() {
        var alerts;

        if(this.state.error) {
            alerts = (
                <div className="alert alert-danger">{this.state.error}</div>
            );
        }

        var planDetails = plans[this.state.plan];
        return (
            <div className="row">
                <form id="payment-form" className="form-horizontal col-md-8" onSubmit={this.onSubmit}>
                    <h2>Submit your Payment Information</h2>
                    {alerts}
                    {this.renderFormComponent({
                        type: 'email',
                        id: 'email',
                        label: 'Email Address',
                        stripe: null
                    })}
                    {this.renderFormComponent({
                        type: 'text',
                        id: 'campaign_name',
                        label: 'Campaign Name',
                        stripe: null
                    })}
                    <div className="form-group">
                        <label htmlFor='campaign_description' className="col-sm-2 control-label">Campaign Description</label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                id="campaign_description"
                                value={this.state.campaign_description}
                                rows="8"
                                onChange={this.handleChange.bind(this, "campaign_description")}
                                disable={this.state.disableForm} />
                        </div>
                    </div>
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

                    <div className="form-group">
                        <label htmlFor="expiration" className="col-sm-2 control-label">Expiration (MM/YYYY)</label>
                        <div className="col-sm-10">
                            <select data-stripe="exp-month" disable={this.state.disableForm} >
                                {this.renderMonthDropdownOptions()}
                            </select>
                            <span> / </span>
                            <input
                                type="text"
                                size="4"
                                maxLength="4"
                                data-stripe="exp-year"
                                disable={this.state.disableForm} />
                        </div>
                    </div>

                    {this.renderCoupon()}

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" disabled={this.state.pendingAuth}>Submit Payment</button>
                        </div>
                    </div>
                </form>
                <div className="col-md-3">
                    <h3>Plan Overview</h3>
                    <Plan
                        name={this.state.plan}
                        price={planDetails.price}
                        coupon={this.state.coupon}
                        tweets={planDetails.tweets}
                        hideButton={true} >
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
            var loveUrl = 'http://' + window.location.host + '/love/' + window.encodeURIComponent(this.state.campaign_name);
            var messageUrl = 'http://' + window.location.host + '/campaign/' + window.encodeURIComponent(this.state.campaign_name);
            return (
                <div className="row" style={{fontSize: '1.15em'}}>
                    <h2>Thank you, you have successfully added your campaign</h2>
                    <p>
                        Simply follow these steps and
                        watch as your monthly content and PR pushes reach a higher share
                        count and exposure.
                    </p>
                    <ol>
                        <li>Send out your campaign link to your lovers: <a href={loveUrl}>{loveUrl}</a></li>
                        <li>Watch as you gain soo many lovers</li>
                        <li>Go to: <a href={messageUrl}>{messageUrl}</a> to syndicate tweets. Make sure its a good tweet as you only can syndicate 1 tweet / month</li>
                    </ol>
                    <p>
                        Feel free to ping any of us at support@doyouloveus.com or call us directly at (832) - 795-9744
                    </p>
                </div>
            );
        }
    }
});
