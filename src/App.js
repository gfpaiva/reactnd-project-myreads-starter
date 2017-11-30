import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import './App.css';

class BooksApp extends Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		books: []
	};

	componentDidMount() {
		if(this.state.books.length <= 0) {
			BooksAPI.getAll()
				.then(books => {
					this.setState({books})
				});
		}
	}

	moveShelf = (book, shelf) => {
		this.setState(function(prev) {
			let newState = prev.books.filter(_ => _.id !== book.id);
			book.shelf = shelf;
			return newState.concat(book);
		});
		// BooksAPI.update(book, shelf)
		// 	.then(() => {
		// 	});
	};


	render() {
		const shelfs = [
			{
				type: 'currentlyReading',
				title: 'Currently Reading'
			},
			{
				type: 'wantToRead',
				title: 'Want to Read'
			},
			{
				type: 'read',
				title: 'Read'
			}
		];

		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<Home
						{...{shelfs}}
						books={this.state.books}
						moveShelf={this.moveShelf}
					/>
				)} />
				<Route path="/search" render={() => <Search />}/>
			</div>
		)
	}
}

export default BooksApp;
