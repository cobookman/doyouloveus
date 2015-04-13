"use strict";

var React = require('react');

module.exports = React.createClass({
    mailto: function() {
        var a = document.createElement('a');
        a.href = 'mailto:cobookman@gmail.com?subject=[Sales] doyouloveus.com';
        a.style.display = 'none';
        a.style.visible = 'hidden';
        document.body.appendChild(a);
        a.click();
    },
    render: function() {
        return (
            <div className="container">
                <h3>
                    For Signup information, please contact us through email: <a href="#" onClick={this.mailto}>cobookman [at] gmail [.] com</a>
                </h3>
            </div>
        );
    }
});
