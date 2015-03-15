"use strict";

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        var params = this.getParams();
        return {
            name: params.name,
            amount: parseInt(params.amount, 10) || 2
        };
    },
    changeSelection: function(value) {
        this.setState({amount: value});
    },
    loveThem: function(service, e) {
        e.preventDefault();
        e.stopPropagation();
        window.localStorage.setItem(
            'onAuthCallback',
            '/api/love/' + service + '/' + this.state.name +'/' + this.state.amount
        );
        window.location = '/twitter/login';
    },
    renderOption: function(context) {
        var active = this.state.amount === context.value;
        return (
            <div
                className={"option col-md-4 txt-center" + (active ? ' active' : '')}
                onClick={this.changeSelection.bind(this, context.value)}>

                <h3>{context.heading}</h3>
                <img src={context.img} />
                <br />
                <input
                    type="radio"
                    name="amountoflove"
                    value="1"
                    checked={active}
                    onChange={this.changeSelection.bind(this, context.value)} />
            </div>
        );
    },

    render: function() {
        return (
            <div className="container lovethem">
                <h2 className="txt-center">How much do you love {this.state.name}</h2>
                <div className="row">
                    {this.renderOption({
                        value: 1,
                        img: "http://www.howbadcoulditbe.com/gif/acquaintance",
                        heading: "Aquantence"
                    })}
                    {this.renderOption({
                        value: 2,
                        img: "http://www.howbadcoulditbe.com/gif/friends",
                        heading: "Friend"
                    })}
                    {this.renderOption({
                        value: 3,
                        img: "http://www.howbadcoulditbe.com/gif/wife",
                        heading: "Wife"
                    })}
                </div>
                <div className="row">
                    <a
                        className="btn btn-primary btn-lg"
                        href="#"
                        onClick={this.loveThem.bind(this, 'twitter')}>
                            Twitter
                    </a>
                </div>
            </div>
        );
    }
});
