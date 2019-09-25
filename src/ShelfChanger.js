import React, {Component} from 'react';

class ShelfChanger extends Component{

    handleSubmit = (e) =>{
        this.props.bookType(e);
    }

    render(){
        const {bookShelf} = this.props;
        return(
            <div className="book-shelf-changer">
                <select className='shelf-changer' onClick={this.setdefault} onChange={this.handleSubmit}>
                    <option value="move" disabled >Move to...</option>
                    <option value="currentlyReading" selected ={bookShelf === "currentlyReading" && (true)}>Currently Reading</option>
                    <option value="wantToRead" selected ={bookShelf === "wantToRead" && (true)}>Want to Read</option>
                    <option value="read" selected ={bookShelf === "read" && (true)}>Read</option>
                    <option value="none" selected ={bookShelf === "none" && (true)}>None</option>
                </select>              
            </div>
        )
    }



}

export default ShelfChanger;