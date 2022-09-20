import React from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Books from './Books.jsx';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
    }

    this.onChangeAuthorQuery = this.onChangeAuthorQuery.bind(this);
    this.search = this.search.bind(this)

  }

  onChangeAuthorQuery(e) {
    e.preventDefault();
    this.setState({
      author: e.target.value
    })
  }

  search() {
    this.props.authorSearch(this.state.author);
  }

  render() {

    return (
      <div className='Search'>
          <h3>Type In The Author Here:</h3>
          <div className='Form'>
          <form>
              <input value={this.state.author} onChange={this.onChangeAuthorQuery} />
              <button type='button' className="button-54" onClick={this.search} >Search</button>
          </form>
          </div>
      </div>
    )
  }
};

export default Search;