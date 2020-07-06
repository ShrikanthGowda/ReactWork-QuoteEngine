import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchQuotes, newQuote } from '../actions/index';
import Loading from './loading';
import '../stylesheets/style.css';

class RandomQuotes extends Component {

    constructor() {
        super();
        this.getNewQuote = this.getNewQuote.bind(this);
    }

    componentDidMount() {
        this.props.fetchQuotes();
        this.getNewQuote();
    }

    getNewQuote() {
        const randomQuoteIndex = Math.floor(Math.random() * 102);
        this.props.newQuote(randomQuoteIndex);
    }

    render() {
        if(this.props.loading) {
            return <Loading />;
        }

        const { quote, author } = this.props.quotes[this.props.randomNumber];
        const randomColor = this.props.randomColor[Math.floor(Math.random() * 11)];

        return (
            <div className="wrapper" style={{ backgroundColor: randomColor }}>
                <div id="quote-box">
                    <div className="quote-text">
                        <i className="fa fa-quote-left" style = {{color: randomColor}}> </i>
                        &nbsp;
                        <q id="text" style={{ color: randomColor }}>
                            {quote}
                        </q>
                    </div>

                    <div className="quote-author" style={{ color: randomColor }}>
                        -<span id="author"> {author} </span>
                    </div>

                    <div className="buttons">
                        <a
                        href = {`https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&related=freecodecamp&text="${quote}" %0D%0A- ${author}%0D%0A`}
                        className="button"
                        id="tweet-quote"
                        title="Tweet this quote!"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: randomColor }}
                        >
                            TWEET
                        </a>
                        
                        <button
                        className="button"
                        id="new-quote"
                        onClick={this.getNewQuote}
                        style={{backgroundColor: randomColor}}
                        >
                            NEW QUOTE
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    quotes: state.quote.data,
    randomNumber: state.quote.randomNumber,
    loading: state.quote.loading,
    randomColor: state.quote.colors,
});

const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {
            fetchQuotes,
            newQuote,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RandomQuotes);
