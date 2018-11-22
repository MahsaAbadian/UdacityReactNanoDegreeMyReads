import React, { Component } from 'react';
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'




class SearchBooks extends Component{
  state = {
    query:'',
    showingBooks:[],
    error: false
  }

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
  }

  changeHandler=(event)=>{
    const q=event.target.value.trim()
    if(q){
      var scope=this;
      BooksAPI.search(q).then((results)=>{
        if(results.error){
          this.setState({query:'',
          showingBooks:[],
          error: true})
        }
        else{
        const existingBooks = scope.props.shelfBooks;
        const newResults = results.map(function(val){
            let res = existingBooks.find(el => (el.id === val.id));
            val.shelf = 'none';
            return res ? res : val;
        });
        this.setState({
          query:q,
          showingBooks:(newResults.length>0)? newResults:[],
          error:false
        })
      }
    })}
    else{
      this.setState({
        query:q,
        showingBooks:[],
        error:false
      })
    }

  }

  render(){
    return(
      <div>
      <div>Search</div>
      <div className="search-books">
      <div className="search-books-bar">
      <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={this.changeHandler}/>
          </div>
        </div>
          <div className="search-books-results">
            <Shelf title={this.state.error? "No Books Found": "Search Results"} books={this.state.showingBooks} onShelfChange={this.props.onShelfChange}/>
          </div>
      </div>
      </div>
    )
  }
}
export default SearchBooks
