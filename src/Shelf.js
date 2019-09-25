import React, {Component} from 'react';
import Book from './Book';


class Shelf extends Component{

    //A method to send book status to the App component
    bookStatus = (e, book) => {
        this.props.bookStatus(e, book);
    }

    render(){
        return(
            <div className="list-books-content">
                <div className="bookshelf"></div>
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.booksInfo.map(book=>(
                                <li key={book.id}>
                                <Book bookInfo={book}
                                    bookStatus={this.bookStatus}/>
                                </li>
                            ))}
                        </ol>
                    </div>
            </div>
            
        )
    }
}

export default Shelf;