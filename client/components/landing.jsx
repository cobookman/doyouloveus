"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
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
                                <Link className="btn btn-primary btn-lg" to="signup">
                                    Get early access
                                </Link>
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

                <div className="row">
                    <div className="col-lg-12 txt-center">
                        <h3 style={{
                            fontSize: '2.75em'
                        }}>DYLUs is in Private Beta</h3>

                        <p style={{
                            fontSize: '1.33em'
                        }}>
                            Sign up and get early access when we launch
                        </p>

                        <Link className="btn btn-primary btn-lg" to="signup" style={{
                            borderRadius: '2px'
                        }}>Get early access</Link>
                    </div>
                </div>
            </div>
        );
    }
});
