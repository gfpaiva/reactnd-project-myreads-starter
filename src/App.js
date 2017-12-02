import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Single from './pages/Single/Single';
import './App.css';

class BooksApp extends Component {
	state = {
		books: []
	};

	componentDidMount() {
		//Fetch all my books is state is empty
		if(this.state.books.length <= 0) {
			BooksAPI.getAll()
				.then(books => {
					this.setState({books})
				});
		}
	}

	/**
	 * Move book from other shelf,fetch change if server and update state
	 * @param {Object} book Single book object
	 * @param {String} shelf String represent de new shelf
	 */
	moveShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
		this.setState(function(prev) {
			let newState = prev.books.filter(prevBook => prevBook.id !== book.id);
			book.shelf = shelf;
			return {books: newState.concat(book)}
		});
	};


	render() {
		//Shelfs available
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
				<Switch>
					<Route exact path="/" render={() => (
						<Home
							{...{shelfs}}
							books={this.state.books}
							moveShelf={this.moveShelf}
						/>
					)} />
					<Route path="/search/:term?" render={() => (
						<Search
							{...{shelfs}}
							books={this.state.books}
							moveShelf={this.moveShelf}
						/>
					)}/>
					<Route path="/book/:id" render={({match, history}) => (
						<Single
							bookId={match.params.id}
							{...{shelfs, history}}
							moveShelf={this.moveShelf}

						/>
					)} />
					{/* 404 page */}
					<Route render={() => (<h1 style={{textAlign: 'center'}}>Page not foud 😡</h1>)} />
				</Switch>
			</div>
		)
	}
}

export default BooksApp;
