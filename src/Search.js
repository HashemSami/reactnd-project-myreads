import React, {Component} from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';
import noImage from './icons/INA.png';

class Search extends Component{

    // A method to handle the input key-words from user
    handleChange = (e) => {
        const value = e.target.value;
        if(value){
        this.props.bookSearch(value);
        }
    }

    // A method to show a note once a change happend on the book status
    note = (e, book) =>{
        const image = book.imageLinks? 
        book.imageLinks.thumbnail:
        noImage;

        if(e.target.value !== "none"){
            document.querySelector(".note").innerHTML=
            `
            <div >
            <img src=${image} style="width:6.5em; height:9em;" />
            <p>Added to your </br><span>"${e.target.options[e.target.selectedIndex].innerHTML}"</span> library.</p>
            </div>
            `
            setTimeout(()=>{
            document.querySelector(".note").innerHTML=""
            },2500)
        }
    }

    // A method to handel changes on the book status and send it to the App component
    bookStatus = (e, book) => {
        this.props.bookStatus(e, book);
        this.note(e, book);
    }
    
    render(){
        return(
            <div className="search-books">
                <div className="note"></div>
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input className="search-input" type="text" onChange={this.handleChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.props.searchResults.map(book=>(
                            <li key={book.id}>
                            <Book bookInfo={book}
                                bookStatus={this.bookStatus}/>
                            </li>         
                        ))}
                    </ol>
                </div>
                {this.props.searchResults.length === 0 && (<h4 className='no-result'>No results found</h4>)}
            </div>
        )
    }
}

export default Search;