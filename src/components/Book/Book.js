import React from 'react';
import { Link } from 'react-router-dom';
import Option from '../Option/Option';
import Authors from '../Authors/Authors';
import PropTypes from 'prop-types';

const Book = ({book = [], shelfs = [], moveShelf}) => {
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<Link to={`/book/${book.id}`}>
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
					</Link>
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

				<Link to={`/book/${book.id}`}>
					<div className="book-title">{book.title}</div>
				</Link>

				<Authors authors={book.authors} classes="book-authors" />
			</div>
		</li>
	);
};

Book.propTypes = {
	book: PropTypes.object.isRequired,
	moveShelf: PropTypes.func.isRequired
}

export default Book;
