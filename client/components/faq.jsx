"use strict";

var React = require('react');
var QAs = [
    {
        question: 'How much does it cost per a share?',
        answer: '$1/monthly share.'
    },
    {
        question: 'How many shares can I do per a month?',
        answer: 'Only 1.'
    },
    {
        question: 'What’s the implementation?',
        answer: 'Simply sign up, login, and write whatever message you’d like your supporters to know about your company and what type of posts you’d like to share with them via twitter.'
    },
    {
        question: 'How are you billing me?',
        answer: 'We have different subscription plans. Each supports a certain number of monthly shares. We don’t bill you for unused shares.'
    },
    {
        question: 'Can I cancel at any time?',
        answer: 'Yes, simply email us at support@doyouloveus.com'
    },
    {
        question: 'What’s your refund policy?',
        answer: 'Full refund if the shares don’t go through.'
    },
    {
        question: 'Can I control who is retweeting my articles?',
        answer: 'Nope. Don’t send your link out to people you don’t want opted in. We’ll be adding this functionality soon enough.'
    },
    {
        question: 'What if I don’t want certain people to be retweeting my article?',
        answer: 'How can I make sure only supporters can opt-in to my campaign?'
    },
    {
        question: 'Can I use hashtags or mentions?',
        answer: 'Nope. Nope.'
    },
    {
        question: 'What platforms do you support?',
        answer: 'Twitter at the moment. We’re in the process of adding Facebook and google Plus.'
    },
    {
        question: 'Do you have any recommended practices?',
        answer: 'We will screen all content with our team. If it looks spammy, non-informative, or has a low read rate, we won’t allow it.\nAs well if your product has questionable reviews splattered across the internet, we won’t support it.'
    },
    {
        question: 'Will you run the campaigns for me?',
        answer: 'You have to send the link to your most fervent supporters.'
    },
    {
        question: 'Do you do non-profit discounts?',
        answer: 'Yes. Email us at support@doyouloveus.com'
    },
    {
        question: 'Do you support all languages?',
        answer: 'Yes'
    },
    {
        question: 'Can I pull my supporters contact information? ',
        answer: 'Yes. Email us at support@doyouloveus.com'
    }
];

module.exports = React.createClass({
    renderQA: function(qa) {
        var slug = qa.question.toLowerCase().replace(/\s/g, '-').replace(/[^_a-z0-9\-]/g,'');
        return (
            <div id={slug} className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{qa.question}</h3>
                </div>
                <div className="panel-body">{qa.answer}</div>
            </div>
        );
    },
    render: function() {
        return (
            <div className="row">
                <h2>DoYouLoveUs FAQs</h2>
                {QAs.map(this.renderQA)}
            </div>
        );
    }
});
