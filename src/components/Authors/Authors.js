import React from 'react';
import PropTypes from 'prop-types';
import If from '../If/If';

const Authors = ({authors = [], classes = ''}) => {
	return (
		<If condition={authors && authors.length > 0}>
			<div className={classes}>{authors.map((author, index) =>
					<span style={{display: 'block'}} key={index}>{author}{index !== authors.length - 1 ? ', ' : ''}</span>
				)}
			</div>
		</If>
	);
};

Authors.propTypes = {
	authors: PropTypes.array,
	classes: PropTypes.string
}

export default Authors;
