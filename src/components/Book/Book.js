import React, { Component } from 'react';
import Option from '../Option/Option';
import PropTypes from 'prop-types';

class Book extends Component {
	render() {

		const {book = {}, shelfs, moveShelf} = this.props;
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
						<div className="book-shelf-changer">
							<select defaultValue={book.shelf} onChange={(e) => moveShelf(book, e.target.value)}>
								<option value="none" disabled>Move to...</option>
								{shelfs.map(_ =>
									<Option {..._} key={_.type} shelf={book.shelf} />
								)}
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors.map((author, index) =>
						<span style={{display: 'block'}} key={index}>{author}{index !== book.authors.length - 1 ? ', ' : ''}</span>
					)}</div>
				</div>
			</li>
		);
	}
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
}

export default Book;
