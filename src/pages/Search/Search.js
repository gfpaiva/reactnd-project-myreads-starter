import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {findKey} from 'lodash';
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

	componentDidMount() {
		this.searchInput.focus();
	}

	mergeBooks = books => {
		return books.map(book => {
			let findObject = findKey(this.props.books, {id: book.id});
			if( findObject ) book.shelf = this.props.books[findObject].shelf;

			return book;
		});
	};

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
						.then(this.mergeBooks)
						.then(books => this.setState({books}))
						.then(() => window.scroll(0, 0))
				}, 300)
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
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={this.typeHandler}
							ref={(input) => { this.searchInput = input; }}
						/>
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

BookGrid.propTypes = {
	shelfs: PropTypes.array.isRequired,
	moveShelf: PropTypes.func.isRequired
};

export default Search;
