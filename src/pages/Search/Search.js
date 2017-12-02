import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {findKey as _findKey} from 'lodash';
import * as BooksAPI from '../../utils/BooksAPI';
import If from '../../components/If/If';
import BookGrid from '../../components/BookGrid/BookGrid';
import Filter from '../../components/Filter/Filter';
import PropTypes from 'prop-types';

class Search extends Component {
	state = {
		query: '',
		typingTimeout: 0,
		searchComplete: false,
		books: [],
		allBooks: [],
		options: []
	}

	componentDidMount() {
		this.searchInput.focus();
	}

	mergeBooks = books => {
		if(books.error) return [];

		return books.map(book => {
			let findObject = _findKey(this.props.books, {id: book.id});
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
			query: e.target.value,
			searchComplete: false
		});

		if(value.length > 2) {
			this.setState({
				typingTimeout: setTimeout(() => {
					BooksAPI.search(value)
					.then(this.mergeBooks)
					.then(books => this.setState({books, allBooks: books}))
					.then(() => this.setState({
						searchComplete: true,
						options: []
					}))
					.then(() => {
						window.scroll(0, 0);
						document.querySelectorAll('input[type=checkbox]:checked').forEach(function(v) {
							v.checked = false;
						});
					})
				}, 300)
			})
		}
	};

	filterResults = (options) => {
		let results = [];

		options.forEach(option => {
			const filtered =  this.state.allBooks.filter(_ => _.categories && _.categories.length > 0 && _.categories.indexOf(option) >= 0);
			results = results.concat(filtered);
		});

		return results;
	}

	filterHandler = (e) => {
		const value = e.target.value;
		const checks = this.state.options;

		if(e.target.checked) {
			const newOptions = checks.concat(value);
			const filteredResults = this.filterResults(newOptions);

			this.setState({
				books: filteredResults,
				options: newOptions
			});
		} else {
			const newOptions = checks.filter(option => option !== value);

			if(newOptions <= 0) {
				this.setState({
					books: this.state.allBooks,
					options: newOptions
				});
			} else {
				const filteredResults = this.filterResults(newOptions);

				this.setState({
					books: filteredResults,
					options: newOptions
				});
			}
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
						<div>
							<Filter filterHandler={this.filterHandler} allBooks={this.state.allBooks} />
							<BookGrid
								currentBooks={this.state.books}
								{...{shelfs, moveShelf}}
							/>
						</div>
					</If>
					<If condition={this.state.books.length <= 0 && this.state.searchComplete}>
						<h2 style={{textAlign: 'center'}}>We dont find any results 😐</h2>
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
