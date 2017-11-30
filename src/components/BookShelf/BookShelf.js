import React, { Component } from 'react';
import Book from '../Book/Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
	render() {
		const { type, title, books } = this.props;
		const currentBooks = books.filter(book => book.shelf === type);

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{currentBooks.map(book => {
							const {title, authors, imageLinks, shelf} = book;

							return <Book  {...{title, authors, imageLinks}} key={book.id} />
							}
						)}
					</ol>
				</div>
			</div>
		);
	};
};

BookShelf.propTypes = {
	title: PropTypes.string.isRequired
};

export default BookShelf;
