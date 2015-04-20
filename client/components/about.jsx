"use strict";

var React = require('react');

module.exports = React.createClass({
    renderStaff: function(staff) {
        return (
            <div className="col-sm-3 panel panel-default">
                <div className="panel-body">
                    <div className="author-img" style={{
                        width: '100%',
                        backgroundImage: 'url(' + staff.img + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        maxWidth: '50vw'
                    }} />
                    <h4>{staff.name}</h4>
                    <h5>{staff.title}</h5>
                </div>
            </div>
        );
    },
    fixImgWidth: function() {
        var imgs = window.document.querySelectorAll('.author-img');
        for(var i = 0, l = imgs.length; i < l; ++i) {
            var img = imgs[i];
            var width = img.offsetWidth;
            img.style.height = (width ) + 'px';
        }
    },
    componentDidMount: function() {
        this.fixImgWidth();
        window.addEventListener('resize', this.fixImgWidth.bind(this));
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <h2>About doyouloveus.com</h2>
                    <p>Doyouloveus is a startup based out of The Negev hacker house located in the heart of SOMA, SF</p>
                </div>
                <div className="row">
                    <h3>Staff</h3>
                    {this.renderStaff({
                        name: "Colin Bookman",
                        title: "Adviser",
                        img: "/img/staff/colin.bookman.jpg"
                    })}
                    {this.renderStaff({
                        name: "Brian Clark",
                        title: "Co Founder",
                        img: "/img/staff/brian.clark.jpg"
                    })}
                    {this.renderStaff({
                        name: "Kumar Thangudic",
                        title: "Co Founder",
                        img: "/img/staff/kumarovski.thangudic.jpg"
                    })}
                </div>
            </div>
        );
    }
});
