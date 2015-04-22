"use strict";

var React = require('react');
var Router = require('react-router');
var Plan = require('./plan');
var plans = require('../plans');

module.exports = React.createClass({
    renderPlans: function() {
        var output = [];
        for(var key in plans) {
            if(plans.hasOwnProperty(key)) {
                output.push(
                    <div className="col-md-3">
                        <Plan
                            name={key}
                            price={plans[key].price}
                            tweets={plans[key].tweets} />
                    </div>
                );
            }
        }
        return output;
    },
    render: function() {
        return (
            <div className="landing" style={{
                marginBottom: '5em'
            }}>
                <div className="jumbotron featurette">
                    <div className="container row">
                        <div className="col-md-7">
                            <h2 className="heading">
                                Gather supporters and broadcast announcements on their social networks automagically
                            </h2>
                            <p>
                                <a href="#plans" className="btn btn-primary btn-lg">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                        <div className="col-md-5 browser">
                            <div className="top" />
                            <img className="content img-responsive" src="/img/featurette.png" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 txt-center cell">
                        <img src="/img/icons/chat.png"/>
                        <h2>Create your Campaign</h2>
                        <p>Create a campaign</p>
                    </div>
                    <div className="col-lg-4 txt-center cell">
                        <img src="/img/icons/graph.png" />
                        <h2>Invite Your Supporters</h2>
                        <p>Send your supporters an invite link so they can opt-in via their social media accounts</p>
                    </div>
                    <div className="col-lg-4 txt-center cell">
                        <img src="/img/icons/check.png" />
                        <h2>Watch Your Share Count Rise</h2>
                        <p>Each month watch as your posts are automatically shared to your supporters social media accounts</p>
                    </div>
                </div>

                <div className="seperator"></div>

                <div className="row">
                    <div className="col-lg-offset-2 col-lg-4 txt-center cell">
                        <img src="/img/icons/globe.png" />
                        <h2>Duration</h2>
                        <p>Users can specify for what duration of months they would like to keep supporting you</p>
                    </div>
                    <div className="col-lg-4 txt-center cell">
                        <img src="/img/icons/briefcase.png" />
                        <h2>Analytics</h2>
                        <p>Find out how many of your supporters opted in and the estimated reach of your posts</p>
                    </div>
                </div>

                <div className="seperator"></div>

                <div id="plans" className="row" style={{marginTop: '1em'}}>
                    {this.renderPlans()}
                    <div className="col-md-3">
                        <div className="pricingBox">
                            <h3>Enterprise</h3>
                            <h1>Contact Us</h1>
                            <h3>75+ supporters</h3>
                            <a href='mailto:support@doyouloveus.com?subject=Enterprise Plan'>
                                Sign Up
                                <span style={{
                                    background: 'url(/img/icons/twitter-bird.png)',
                                    width: '26px',
                                    height: '20px',
                                    display: 'inline-block',
                                    backgroundRepeat: 'no-repeat',
                                    marginLeft: '9px',
                                    marginRight: '-18px'
                                }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
