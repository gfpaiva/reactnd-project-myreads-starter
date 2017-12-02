import React from 'react';
import Option from '../Option/Option';
import PropTypes from 'prop-types';

const Book = ({book = [], shelfs = [], moveShelf}) => {
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
					<div className="book-shelf-changer">
						<select defaultValue={book.shelf || 'move'} onChange={(e) => moveShelf(book, e.target.value)}>
							<option value="move" disabled>Move to...</option>
							{shelfs.map(currShelf =>
								<Option {...currShelf} key={currShelf.type} shelf={book.shelf} />
							)}
							{(book.shelf) ? <option value="none">None</option> : ''}
						</select>
					</div>
				</div>

				<div className="book-title">{book.title}</div>

				{book.authors&& book.authors.length > 0 &&
					<div className="book-authors">{book.authors.map((author, index) =>
						<span style={{display: 'block'}} key={index}>{author}{index !== book.authors.length - 1 ? ', ' : ''}</span>
					)}</div>
				}
			</div>
		</li>
	);
};

Book.propTypes = {
	book: PropTypes.object.isRequired,
	moveShelf: PropTypes.func.isRequired
}

export default Book;
