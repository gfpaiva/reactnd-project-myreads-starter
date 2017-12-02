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
			let newState = prev.books.filter(prevBook => prevBook.id !== book.id);
			book.shelf = shelf;
			return {books: newState.concat(book)}
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
					<Route path="/book/:id" render={({match}) => (
						<Single
							bookId={match.params.id}
							{...{shelfs}}
							moveShelf={this.moveShelf}
						/>
					)} />
					<Route render={() => (<h1 style={{textAlign: 'center'}}>Page not foud 😡</h1>)} />
				</Switch>
			</div>
		)
	}
}

export default BooksApp;
