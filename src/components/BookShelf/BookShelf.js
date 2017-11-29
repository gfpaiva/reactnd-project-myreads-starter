import React, { Component } from 'react';
import Book from '../Book/Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Currently Reading</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						<Book />
					</ol>
				</div>
			</div>
		);
	};
};

BookShelf.propTypes = {};

BookShelf.defaultProps = {};

export default BookShelf;
