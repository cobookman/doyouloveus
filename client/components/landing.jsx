"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    render: function() {
        return (
            <div style={{
                marginBottom: '5em'
            }}>
                <div className="jumbotron">
                    <div className="container row">
                        <div className="col-md-7">
                            <h2 className="featurette-heading" style={{
                                fontSize: '3.25em',
                                fontWeight: '300',
                                marginTop: 0
                            }}>
                                Gather supporters and broadcast announcements on their social networks automagically
                            </h2>
                            <p>
                                <Link className="btn btn-primary btn-lg" to="signup" style={{
                                    borderRadius: '2px'
                                }}>Get early access</Link>
                            </p>
                        </div>
                        <div className="col-md-5 featurette-image" style={{
                            margin: 0,
                            padding: 0,
                            background: '#fff'
                        }}>
                            <div className="featurette-image" style={{
                                background: "url('/img/browserBar.png')",
                                backgroundPosition: 'left top',
                                backgroundSize: 'cover',
                                width: '100%',
                                height: '2.25em',
                                marginBottom: '1em'
                            }} />
                            <img className="featurette-image img-responsive" src="/img/featurette.png" style={{
                                padding: '1em'
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 txt-center">
                        <img src="/img/icons/chat.png" style={{ width: '6.5em', height: '6.5em'}} />
                        <h2>Create your Campaign</h2>
                        <p>Create a campaign</p>
                    </div>
                    <div className="col-lg-4 txt-center">
                        <img src="/img/icons/graph.png" style={{width: '6.5em', height: '6.5em'}} />
                        <h2>Invite Your Supporters</h2>
                        <p>Send your supporters an invite link so they can opt-in via their social media accounts</p>
                    </div>
                    <div className="col-lg-4 txt-center">
                        <img src="/img/icons/check.png" style={{width: '6.5em', height: '6.5em'}} />
                        <h2>Watch Your Share Count Rise</h2>
                        <p>Each month watch as your posts are automatically shared to your supporters social media accounts</p>
                    </div>
                </div>

                <div className="seperator"></div>

                <div className="row">
                    <div className="col-lg-offset-2 col-lg-4 txt-center">
                        <img src="/img/icons/globe.png" style={{width: '6.5em', height: '6.5em'}} />
                        <h2>Duration</h2>
                        <p>Users can specify for what duration of months they would like to keep supporting you</p>
                    </div>
                    <div className="col-lg-4 txt-center">
                        <img src="/img/icons/briefcase.png" style={{width: '6.5em', height: '6.5em'}} />
                        <h2>Analytics</h2>
                        <p>Find out how many of your supporters opted in and the estimated reach of your posts</p>
                    </div>
                </div>

                <div className="jumbotron" style={{
                    paddingTop: '2em'
                }}>
                    <div className="container row">
                        <h2 className="featurette-heading text-center" style={{
                            fontSize: '2.25em',
                            fontWeight: '300',
                            marginTop: 0
                        }}>
                            Hear what some of our users have to say
                        </h2>
                    </div>
                    <div className="container row">
                        <div className="col-lg-offset-1 col-lg-5 txt-center" style={{
                        }}>
                            <div style={{
                                background: '#fff',
                                height: '325px',
                                border: '1px solid #dedede',
                                borderRadius: '5px',
                                padding: '1.5em'
                            }}>
                                <p>
                                    "DoYouLoveUs helped us go viral among our small support network.
                                    Little did we realize that some of the followers of our supporters
                                    were customers of our manufacturing product. #ShutUpAndTakeMyMoney"
                                </p>
                                <div className="circle-img" style={{
                                    width: '5em',
                                    height: '5em',
                                    background: "url('/img/customers/ivan.jpg')",
                                    backgroundSize: '5em',
                                    display: 'inline-block'
                                }}/>
                                <div style={{
                                    width: '100%',
                                    fontSize: '1.25em'
                                }}>
                                    Ivan is the sales manager at EMD
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 txt-center" style={{
                        }}>
                            <div style={{
                                background: '#fff',
                                height: '325px',
                                border: '1px solid #dedede',
                                borderRadius: '5px',
                                padding: '1.5em'
                            }}>
                                <p>
                                    "DYLUs is a must have product for every PR company on the planet.
                                    I've been doing this for 8 years now and it has helped us grow our
                                    client base by 25% directly."
                                </p>
                                <div className="circle-img" style={{
                                    width: '5em',
                                    height: '5em',
                                    background: "url('/img/customers/john.jpg')",
                                    backgroundSize: '5em',
                                    display: 'inline-block',
                                    marginTop: '1.25em',
                                    marginBottom: '1em'
                                }}/>
                                <div style={{
                                    width: '100%',
                                    fontSize: '1.25em'
                                }}>
                                    Ivan is the sales manager at EMD
                                </div>
                            </div>
                        </div>
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
