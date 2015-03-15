"use strict";
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var About = require('./components/about');
var Faq = require('./components/faq');
var Signup = require('./components/signup');
var Landing = require('./components/landing');
var Error404 = require('./components/error404');
var Nav = require('./components/nav');

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
        <Route name="signup" handler={Signup} />
        <NotFoundRoute handler={Error404}/>
        <DefaultRoute name="landing" handler={Landing} />
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
