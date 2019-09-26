import React, {Component} from 'react';

class ShelfChanger extends Component{

    handleSubmit = (e) =>{
        this.props.bookType(e);
    }

    render(){
        const {bookShelf} = this.props;
        const value = bookShelf => {
          if(bookShelf === "currentlyReading") return "currentlyReading";
          if(bookShelf === "wantToRead") return "wantToRead";
          if(bookShelf === "read") return "read";
          if(bookShelf === "none") return "none";
        }

        return(
            <div className="book-shelf-changer">
                <select className='shelf-changer' defaultValue={value(bookShelf)} onChange={this.handleSubmit}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>              
            </div>
        )
    }
}

export default ShelfChanger;