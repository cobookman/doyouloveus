"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    renderUserDetails: function() {
        if(window.user && window.user.twitter_username) {
            return [
                (
                    <li>
                        <Link to="account" params={{username: window.user.twitter_username}}>
                            <span style={{
                                background: 'url(/img/icons/twitter-bird.png)',
                                backgroundRepeat: 'no-repeat',
                                paddingLeft: '21px',
                                backgroundSize: '18px'
                            }}>
                                @{window.user.twitter_username}
                            </span>
                        </Link>
                    </li>
                ),
                (
                    <li>
                        <a href="/logout">Logout</a>
                    </li>
                )
            ];
        }
        else {
            return (
                <li><a href="/twitter/login">Login</a></li>
            );
        }
    },
    render: function () {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar">

                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Do you love us</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="about">About</Link></li>
                            <li><Link to="faq">FAQ</Link></li>
                            <li><a href="/#plans">Signup</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {this.renderUserDetails()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
