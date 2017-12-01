import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BookShelf from '../../components/BookShelf/BookShelf';
import PropTypes from 'prop-types';

class Home extends Component {

	render() {
		const { shelfs = [], books = [], moveShelf } = this.props;

		return (
			<div className="list-books">
				<Header />
				<div className="list-books-content">
					<div>
						{shelfs.map(shelf => (
							<BookShelf
								{...shelf}
								key={shelf.type}
								books={books}
								shelfs={shelfs}
								moveShelf={moveShelf}
							/>
						))}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

BookShelf.propTypes = {
	shelfs: PropTypes.array.isRequired,
	books: PropTypes.array.isRequired,
	moveShelf: PropTypes.func.isRequired
};

export default Home;
