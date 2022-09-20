import React from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.setChecked = this.setChecked.bind(this);
  }

  setChecked(e, id) {
    if (!e.target.checked) {
      e.target.checked = false
      this.props.updateBook(id, e.target.checked)
    } else {
    if (e.target.checked) {
      // mark as read
      e.target.checked = true
      this.props.updateBook(id, e.target.checked)
    }
    }
  }

  render() {
    let bookList = this.props.bookList;
    return (
      <div className="BookList">
        <h3>Your Book List</h3><br />
        {bookList.results && bookList.results.length > 0 && bookList.results.map((book) => {
          return (<div key={book._id} className='EachBook'>
            <h4>
              <a href={book.url} >{book.book_title} by {book.book_author}</a>
              <p>
              {book.summary}
              </p>
            </h4>
            <form>
              <input type="checkbox" onChange={(e) => this.setChecked(e, book._id)} name="controlled" className="CheckBox"></input>
            </form>

            <button onClick={(e) => { this.props.deleteBook(book._id) }} className="button-54">Remove from list</button>
          </div>)
        })}
      </div>
    )
  }


};

export default Books;