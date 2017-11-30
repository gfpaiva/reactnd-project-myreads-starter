import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
	constructor(props) {
		super(props);

		console.log('⌛⌛⌛⌛', props);
	}
	render() {
		const {title, authors, imageLinks, shelf} = this.props;
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
						<div className="book-shelf-changer">
							<select>
								<option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors[0]}</div>
				</div>
			</li>
		);
	}
}

Book.propTypes = {
	title: PropTypes.string.isRequired,
	authors: PropTypes.array.isRequired,
	imageLinks: PropTypes.object.isRequired,
}

export default Book;
