import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import './App.css';

class BooksApp extends Component {
	state = {
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
		BooksAPI.update(book, shelf);
		this.setState(function(prev) {
			let newState = prev.books.filter(_ => _.id !== book.id);
			book.shelf = shelf;
			return newState.concat(book);
		});
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
				<Route path="/search" render={() => (
					<Search
						{...{shelfs}}
						moveShelf={this.moveShelf}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp;
