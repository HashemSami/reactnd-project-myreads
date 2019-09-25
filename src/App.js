import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import Search from './Search';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books:[],
    searchResults:[]
  }

  // Getting the data from API with componentDidMount method and set the state with the results 
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(()=> ({
        books
      }))
    });
  }

  // A method for updating the book status when the shelf changer is clicked 
  bookStatusUpdate = (e, book)=>{
    const value = e.target.value;
    
    BooksAPI.update(book,value).then(()=>{

      this.setState((c)=>({
        books : c.books.filter(b => b.id !== book.id)
      }))

      if(value !== "none"){
        book.shelf = value;
        this.setState((c)=>({
          books : c.books.concat([book])
        }))
      }
    })
  }

  // A method for matching the searched books's shelves with the current data 
  matchBooks = books => {
    books.forEach(book => {
      const a = this.state.books.filter(b=>b.id===book.id)
      if(a.length){
        book.shelf = a[0].shelf;
      }else{
        book.shelf = "none"
      }
    })
  }

  // A method for getting the searched books from API and set the state with the results 
  bookSearchUpdate = (searchKey) =>{
    BooksAPI.search(searchKey).then(results =>{
      if(results && !(results.error)){
        this.matchBooks(results)
        this.setState({
         searchResults: results
      })
      }
      else{
        this.setState({
          searchResults: []
        })
      }
    })
  }

  render() {
    // filter the books by shelves
    const filter = books => shelf => books.filter(book => book.shelf === shelf)

    const filterBy = filter(this.state.books);

    const currentlyReading = filterBy('currentlyReading');
    const wantToRead = filterBy('wantToRead');
    const read = filterBy('read');

    return (
      
      <div className="app"> 
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
            <Route exact path='/' render={() => (
            <div>
              <div>
                <Shelf 
                shelfName="Currently Reading"
                booksInfo={currentlyReading}
                bookStatus={this.bookStatusUpdate}
                />

                <Shelf
                shelfName="Want to Read" 
                booksInfo={wantToRead}
                bookStatus={this.bookStatusUpdate}
                />

                <Shelf 
                shelfName="Read"
                booksInfo={read}
                bookStatus={this.bookStatusUpdate}
                />
              </div>
              <div className="open-search">
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
            )}/>
            <Route path='/search' render={() => (
              <Search
                bookSearch={this.bookSearchUpdate}
                searchResults={this.state.searchResults}
                bookStatus={this.bookStatusUpdate}/>
            )}/>
      </div>
      )
    }
  }

export default BooksApp;