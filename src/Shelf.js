import React from 'react'
import './App.css'
import PropTypes from 'prop-types'


class Shelf extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }


 render() {
  const { title ,books,onShelfChange } = this.props
  return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              { books.map((book)=>(
                  <li key={book.id}  >
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${(book.imageLinks)?(book.imageLinks.smallThumbnail):('')})`}}>
                        </div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={(event)=>{onShelfChange(book,event.target.value)}} >
                              <option value="">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
    }
  }

export default Shelf;
