import React from "react";
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Books from './Books.jsx';
import $ from 'jquery';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: []
    }

    this.loadBooks = this.loadBooks.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.authorSearch = this.authorSearch.bind(this);

  }

  componentDidMount() {
    this.loadBooks()
  }

  loadBooks() {
    fetch('/books')
      .then(res => res.json())
      .then((data) => {
        this.setState({ bookList: data })
      })
      .then(() => {
        console.log('no. of books indexed: ', this.state.bookList.results.length)
      })
      .catch((err) => {
        console.error('failed to loadBooks in Books.jsx: ', err);
      })
  }

  updateBook(id, readStatus) {
    console.log('read status', readStatus)
    fetch(`/books/${id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'readStatus': readStatus
        })
      })
      .then(() => {
        console.log('read status updated')
      })
      .catch(function (res) { console.log(res) })
  }

  deleteBook(id) {
    fetch(`/books/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        this.loadBooks();
      })
      .catch(function (res) { console.log(res) })
  }

  authorSearch(search) {
    console.log('searching... ', search)
    axios.post('/books', {search})
    .then((data) =>  {
      this.loadBooks()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='Header'>
          <h1>Bookmark with The New York Times</h1>
        </div>
        <Search authorSearch={this.authorSearch} loadBooks={this.loadBooks} bookList={this.state.bookList} />
        <Books bookList={this.state.bookList} loadBooks={this.loadBooks} updateBook={this.updateBook} deleteBook={this.deleteBook} />
      </div>

    )
  }
};

export default App;