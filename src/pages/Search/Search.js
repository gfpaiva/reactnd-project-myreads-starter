import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import BookGrid from '../../components/BookGrid/BookGrid';
import If from '../../components/If/If';
import PropTypes from 'prop-types';

class Search extends Component {
	state = {
		query: '',
		typingTimeout: 0,
		books: []
	}

	typeHandler = (e) => {
		let value = e.target.value;

		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout);
		 }

		this.setState({
			query: e.target.value
		});

		if(value.length > 2) {
			this.setState({
				typingTimeout: setTimeout(() => {
					BooksAPI.search(value)
						.then(books => this.setState({books}))
						.then(() => window.scroll(0, 0))
				}, 400)
			})
		}
	};

	render() {
		const {shelfs, moveShelf} = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.typeHandler}/>
					</div>
				</div>
				<div className="search-books-results">
					<If condition={this.state.books.length > 0}>
						<BookGrid
							currentBooks={this.state.books}
							{...{shelfs, moveShelf}}
						/>
					</If>
				</div>
			</div>
		);
	};
}

export default Search;
