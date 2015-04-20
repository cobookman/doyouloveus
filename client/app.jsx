"use strict";
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var About = require('./components/about');
var Faq = require('./components/faq');
var Landing = require('./components/landing');
var Error404 = require('./components/error404');
var Nav = require('./components/nav');
var LoveThem = require('./components/loveThem');
var Subscribed = require('./components/subscribed');
var Campaignmsg = require('./components/campaignmsg');
var Payments = require('./components/payments');
var Account = require('./components/account');

// grab user information into global under window
window.user = JSON.parse(document.querySelector('[data-hook=user-information]').innerHTML);

var App = React.createClass({
  render: function () {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Nav />

            {/* this is the important part */}
            <div className="container">
                <RouteHandler/>
            </div>
        </div>
    );
  }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="about" handler={About} />
        <Route name="faq" handler={Faq} />

        <Route name="lovethem" path="/love/:name" handler={LoveThem}>
            <Route path="love/:name/:amount" handler={LoveThem} />
        </Route>

        <Route path="love/:name/:amount" handler={LoveThem} />
        <Route name="subscribed" path="subscribed/:name/:amount" handler={Subscribed} />
        <Route name="campaignmsg" path="campaign/:name" handler={Campaignmsg} />
        <Route name="payments" path="payments/:plan" handler={Payments} />
        <Route name="account" path="account/:username" handler={Account} />

        <NotFoundRoute handler={Error404}/>
        <DefaultRoute name="landing" handler={Landing} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {

  React.render(<Handler/>, document.body);
});

// load jquery as global
window.jQuery = window.$ = require('jquery');

// lazy load bootstrap js
var s = document.createElement('script');
s.type = 'application/javascript';
s.src = window.location.protocol + '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js';
document.getElementsByTagName('head')[0].appendChild(s);
