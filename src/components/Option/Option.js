import React from 'react';
import PropTypes from 'prop-types';

const Option = ({type, title, shelf = ''}) => {
	const checkShelf = shelf === type;
	const selectedAttr = checkShelf ? {disabled: 'disabled'} : {};

	return (
		<option value={type} {...selectedAttr}>
			{checkShelf ? '✔ ' : ''}{title}
		</option>
	);
};

Option.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	shelf: PropTypes.string
};

export default Option;
