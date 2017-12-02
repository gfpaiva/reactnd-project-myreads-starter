import React from 'react';
import If from '../If/If';
import BookGrid from '../BookGrid/BookGrid';
import PropTypes from 'prop-types';

const BookShelf = ( { type, title, books, shelfs, moveShelf } ) => {
	let currentBooks = books.filter(book => book.shelf === type); //Filter books in this shelf

	return (
		<If condition={currentBooks.length > 0}>
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
						<BookGrid {...{currentBooks}} {...{shelfs, moveShelf}} />
				</div>
			</div>
		</If>
	);
};

BookShelf.propTypes = {
	title: PropTypes.string.isRequired
};

export default BookShelf;
