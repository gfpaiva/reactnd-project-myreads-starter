import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookGrid = ({currentBooks = [], shelfs, moveShelf}) => {
	return (
		<ol className="books-grid">
				{currentBooks.map(book => {
					return (
							<Book
								{...{book, shelfs, moveShelf}}
								key={book.id}
							/>
						)
					}
				)}
		</ol>
	);
};

BookGrid.propTypes = {
	currentBooks: PropTypes.array.isRequired,
	shelfs: PropTypes.array.isRequired,
	moveShelf: PropTypes.func.isRequired
};

export default BookGrid;
