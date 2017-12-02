import React from 'react';
import {uniq as _uniq} from 'lodash';
import PropTypes from 'prop-types';
import If from '../If/If';

const Filter = ( {filterHandler, allBooks = []} ) => {

	let categories = allBooks.map(book => book.categories && book.categories.join(', '));
	categories = _uniq(categories);

	return (
		<div>
			<strong>Filter by Category</strong>
			{categories.map((category, index) =>
				<If condition={category} key={index}>
					<span style={{marginLeft: '1em'}}>
						<input type="checkbox" name={category} value={category} onChange={(e) => filterHandler(e)} />
						<label htmlFor={category}>{category}</label>
					</span>
				</If>
			)}
		</div>
	);

};

Filter.propTypes = {
	filterHandler: PropTypes.func.isRequired,
	allBooks: PropTypes.array.isRequired
}

export default Filter;
