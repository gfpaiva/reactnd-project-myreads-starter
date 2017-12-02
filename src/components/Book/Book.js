import React from 'react';
import { Link } from 'react-router-dom';
import MultiInfo from '../MultiInfo/MultiInfo';
import SelectShelf from '../SelectShelf/SelectShelf';
import PropTypes from 'prop-types';

const Book = ( { book = [], shelfs = [], moveShelf } ) => {
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<Link to={`/book/${book.id}`}>
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
					</Link>
					<div className="book-shelf-changer">
						<SelectShelf
							{...{shelfs, moveShelf, book}}
							defaultValue={book.shelf || 'move'}
						/>
					</div>
				</div>

				<Link to={`/book/${book.id}`}>
					<div className="book-title">{book.title}</div>
				</Link>

				<MultiInfo
					info={book.authors}
					classes="book-authors"
					multiline={true}
				/>
			</div>
		</li>
	);
};

Book.propTypes = {
	book: PropTypes.object.isRequired,
	moveShelf: PropTypes.func.isRequired
}

export default Book;
