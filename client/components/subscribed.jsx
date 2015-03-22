"use strict";

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        var params = this.getParams();
        return {
            name: params.name,
            amount: params.amount
        };
    },
    numberToText: function(number) {
        var numbers = [
            'zero',
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
            'eleven',
            'twelve'
        ];
        if(numbers[number]) {
            return numbers[number];
        }
        else {
            return number;
        }
    },
    render: function() {

        return (
            <div className="container text-center">
                <h2>
                    Thanks for syndicating tweets for <a href={"http://www.twitter.com/" + this.state.name}>
                        @{this.state.name}
                    </a>
                    {' for '}
                    {this.numberToText(this.state.amount)}
                    {' '}
                    {this.state.amount === 1 ? 'month' : 'months'}.
                </h2>
                <div className="row">
                <img src="/img/anchorman.gif" style={{width: '70%'}}/>
                </div>
            </div>
        );
    }
});
