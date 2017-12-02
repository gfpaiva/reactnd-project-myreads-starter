import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option/Option';

const SelectShelf = ({shelfs = [], defaultValue = 'move', moveShelf, book = {}}) => {
	return (
		<select {...{defaultValue}} onChange={(e) => moveShelf(book, e.target.value)}>
			<option value="move" disabled>Move to...</option>
			{shelfs.map(currShelf =>
				<Option {...currShelf} key={currShelf.type} shelf={book.shelf} />
			)}
			{(book.shelf) ? <option value="none">None</option> : ''}
		</select>
	);
};

SelectShelf.propTypes = {
	shelfs: PropTypes.array.isRequired,
	moveShelf: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired,
	defaultValue: PropTypes.string
}

export default SelectShelf;
