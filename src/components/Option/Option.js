import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
	render() {
		const {type, title, shelf = ''} = this.props;
		const checkShelf = shelf === type;
		const selectedAttr = checkShelf ? {disabled: 'disabled'} : {};

		return (
			<option value={type} {...selectedAttr}>
				{checkShelf ? '✔ ' : ''}{title}
			</option>
		);
	};
}

Option.propTypes = {}

export default Option;
