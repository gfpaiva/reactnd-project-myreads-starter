import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import Header from '../../components/Header/Header';
import Authors from '../../components/Authors/Authors';
import './Single.css';
// import If from '../../components/If/If';
// import PropTypes from 'prop-types';

class Single extends Component {
	state = {
		book: {}
	};

	componentDidMount() {
		BooksAPI.get(this.props.bookId)
			.then(book => this.setState({ book }))
	};

	render() {
		const book = this.state.book;


		return (
			<div>
				<Header title={book.title || ''} />
				<Link to="/" className="close-search">Close</Link>
				{Object.keys(book).length > 0 &&
					(
						<div className="single container">
							<div className="single__general">
								<img src={book.imageLinks.thumbnail} alt={book.title} title={book.title} />
								<div>
									<h2>{book.title}: <small>{book.subtitle}</small></h2>
									<Authors authors={book.authors} />
									<p>{book.description}</p>
								</div>
							</div>

							<div className="single__specs">
								<p>Publisher: <strong>{book.publisher}</strong></p>
								<p>Publish Date: <strong>{book.publishedDate}</strong></p>
								<p>Pages: <strong>{book.pageCount}</strong></p>
								<p>Language: <strong>{book.language.toUpperCase()}</strong></p>
								<p>Categories: <strong></strong></p>
								<p>ISBN: <strong></strong></p>
								<a href={book.previewLink} target="_blank">See in google books</a>
							</div>
						</div>
					)
				}
			</div>
		)
	};
};

export default Single;
