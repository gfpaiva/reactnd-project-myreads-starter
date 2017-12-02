import React, {Component} from 'react';
import * as BooksAPI from '../../utils/BooksAPI';
import Header from '../../components/Header/Header';
import SelectShelf from '../../components/SelectShelf/SelectShelf';
import MultiInfo from '../../components/MultiInfo/MultiInfo';
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
		const { shelfs = [], moveShelf, history } = this.props;

		return (
			<div>
				<Header title={book.title || ''} />
				<a href="#" onClick={() => history.goBack()} className="close-search">Close</a>
				{Object.keys(book).length > 0 &&
					(
						<div className="single container">
							<div className="single__general">
								<img src={book.imageLinks.thumbnail} alt={book.title} title={book.title} />
								<div>
									<h2>{book.title}{(book.subtitle) ? <small>: {book.subtitle}</small> : ''}</h2>
									<MultiInfo
										info={book.authors}
										classes="book-authors"
										multiline={true}
									/>
									<p>{book.description}</p>
									<div>
										<span>Shelf: </span>
										<SelectShelf
											{...{shelfs, moveShelf, book}}
											defaultValue={book.shelf || 'move'}
										/>
									</div>
								</div>
							</div>

							<div className="single__specs">
								<p>Publisher: <strong>{book.publisher}</strong></p>
								<p>Publish Date: <strong>{book.publishedDate}</strong></p>
								<p>Pages: <strong>{book.pageCount}</strong></p>
								<p>Language: <strong>{book.language.toUpperCase()}</strong></p>
								<p>Categories: <strong><MultiInfo info={book.categories} /></strong></p>
								<p>ISBN: <strong><MultiInfo info={book.industryIdentifiers} objectKey="identifier" /></strong></p>
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
