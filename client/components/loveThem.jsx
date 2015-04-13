"use strict";

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        var params = this.getParams();
        return {
            name: window.decodeURIComponent(params.name),
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
    dateAfterMonths: function(months) {
        var d = new Date();
        d.setMonth(d.getMonth() + months);
        return d;
    },
    getMonthName: function(month) {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ][month];
    },
    renderOption: function(context) {
        var active = this.state.amount === context.value;
        var panelStyle = [
        'panel-danger',
        'panel-info',
        'panel-success'
        ][context.index];

        panelStyle = active ? 'panel-primary' : panelStyle;
        var till = this.dateAfterMonths(context.value);

        return (
            <div
                className="option col-md-4 text-center"
                onClick={this.changeSelection.bind(this, context.value)}>
                    <div className={"panel " +  panelStyle}>
                        <div className="panel-heading">
                            <h3>{context.heading}</h3>
                        </div>
                        <div className="panel-body">
                            <p className="lead" style={{fontSize: '3em', fontWeight: 600}}>
                                {context.value} {context.value === 1 ? 'Month' : 'Months'}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush" style={{fontSize: '1.5em'}}>
                            <li className="list-group-item">
                                1 tweet / month
                            </li>
                            <li className="list-group-item">
                                Through {this.getMonthName(till.getMonth())}, {(till.getFullYear())}
                            </li>
                        </ul>
                    </div>
                    <input
                        type="radio"
                        name="amountolove"
                        value={context.value}
                        checked={active}
                        onChange={this.changeSelection.bind(this, context.value)} />
            </div>
        );
    },

    render: function() {
        return (
            <div className="container lovethem">
                <h2 className="text-center">
                    {"How much do you love "}
                    <b style={{color: '#111'}}>{this.state.name}</b>
                </h2>
                <div className="row" style={{marginTop: '25px'}}>
                    {this.renderOption({
                        value: 1,
                        img: "http://www.howbadcoulditbe.com/gif/acquaintance",
                        heading: "Acquaintance",
                        index: 0,
                    })}
                    {this.renderOption({
                        value: 3,
                        img: "http://www.howbadcoulditbe.com/gif/friends",
                        heading: "Friend",
                        index: 1,
                    })}
                    {this.renderOption({
                        value: 12,
                        img: "http://www.howbadcoulditbe.com/gif/wife",
                        heading: "Love",
                        index: 2
                    })}
                </div>
                <div className="row text-center" style={{marginTop: '25px'}}>
                    <a
                        className="btn btn-primary btn-lg"
                        href="#"
                        onClick={this.loveThem.bind(this, 'twitter')}
                        style={{fontSize: '3em'}}>
                            {"Let's go"}
                    </a>
                </div>
            </div>
        );
    }
});
