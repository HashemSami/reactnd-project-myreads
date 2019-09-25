import React, {Component} from 'react';
import ShelfChanger from './ShelfChanger';
import noImage from './icons/INA.png';

class Book extends Component{

    // A method to grab the book status and sed it to the shelf/search component
    bookType = (e) => {
        this.props.bookStatus(e, this.props.bookInfo);
    }

    render(){
        const {title, authors, shelf} = this.props.bookInfo;
        const image = this.props.bookInfo.imageLinks? 
        this.props.bookInfo.imageLinks.thumbnail:
        noImage;
        
        return(
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})`}}></div>
                <ShelfChanger 
                  bookType={this.bookType}
                  bookShelf = {shelf}
                />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors? authors.join(" & "):""}</div>
        </div>
        )
    }
}

export default Book;