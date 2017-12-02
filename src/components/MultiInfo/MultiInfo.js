import React from 'react';
import PropTypes from 'prop-types';
import If from '../If/If';

const MultiInfo = ( { info = [], classes = '', multiline = false, objectKey = '' } ) => {
	const style = multiline ? {style: {display: 'block'}} : {};

	return (
		<If condition={info && info.length > 0}>
			<span {...style} className={classes}>{info.map((_, index) =>
					<span {...style} key={index}>{objectKey.length > 0 ? _[objectKey] : _ }{index !== info.length - 1 ? ', ' : ''}</span>
				)}
			</span>
		</If>
	);
};

MultiInfo.propTypes = {
	info: PropTypes.array,
	classes: PropTypes.string,
	multiline: PropTypes.bool,
	objectKey: PropTypes.string
}

export default MultiInfo;
