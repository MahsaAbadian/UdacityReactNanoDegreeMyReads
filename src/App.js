import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books})
    })
  }
  onShelfChange = (book ,newShelf ) => {
    if(newShelf!==book.shelf){
      const prevShelf=book.shelf;
      BooksAPI.update(book,newShelf).then(()=>{
      let newBooks=this.state.books;
      newBooks.find(b=>book.id=b.id).shelf=newShelf;
      this.setState({books:newBooks});})
   }
}

render(){
  const books =this.state.books;

  return (
    <div className="app">
    <div>
      <Route exact path='/' render={() => (
        <div className="list-books">
          <Link to='/search' className='open-search'>Search</Link>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">

          <Shelf title="Currently Reading" books={books.filter(b=>(b.shelf==='currentlyReading'))} onShelfChange={this.onShelfChange}/>
          <Shelf title="Want to Read" books={books.filter(b=>(b.shelf==='wantToRead'))} onShelfChange={this.onShelfChange}/>
          <Shelf title="Read" books={books.filter(b=>(b.shelf==='read'))} onShelfChange={this.onShelfChange}/>

          </div>
        </div>
        )
      }/>
      <Route path='/search' render={({ history }) => (
        <SearchBooks onShelfChange={this.onShelfChange} shelfBooks={books}/>
      )}/>
     </div>
     </div>
  )    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  }
}

  export default BooksApp
