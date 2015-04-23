'use strict';
var React = require('react');
var coupons = require('../coupons');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    renderPrice: function() {
        if(this.props.coupon && coupons[this.props.coupon]) {
            var discountPrice = Math.round(this.props.price * coupons[this.props.coupon] * 100) / 100;
            return [
                (
                    <h2 style={{color: '#DA0101'}}><strike>${this.props.price} / month</strike></h2>
                ),
                (
                    <h1>${discountPrice} / month</h1>
                )
            ];
        }
        else {
            return (
                <h1>${this.props.price} / month</h1>
            );
        }
    },
    renderSignupButtom: function() {
        if(this.props.hideButton) {
            return null;
        }
        else {
            return (
                <Link to="payments" params={{plan: this.props.name}}>
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
                </Link>
            );
        }
    },
    render: function() {
        return (
            <div className="pricingBox">
                <h3>{this.props.name}</h3>
                {this.renderPrice()}
                <h3>{this.props.tweets} supporters</h3>
                {this.renderSignupButtom()}
            </div>
        );
    }
});
