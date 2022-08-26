import React, { useState, useEffect } from "react";
import { update } from "../BooksAPI";

const BookShelf = ({ title, books }) => {
  const [changeBookShelf, setChangeBookShelf] = useState("");
  const [booksState, setBooksState] = useState(books);
  const changeBookHandle = (event, book) => {
    setChangeBookShelf(event.target.value);

    update(book, event.target.value);
  };

  useEffect(() => {
    setBooksState(books);
    switch (title) {
      case "Currently Reading":
        setChangeBookShelf("currentlyReading");
        break;
      case "Want To Read":
        setChangeBookShelf("wantToRead");
        break;
      case "Read":
        setChangeBookShelf("read");
        break;
      default:
        setChangeBookShelf("All");
        break;
    }
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksState.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={changeBookShelf}
                      onChange={(e) => changeBookHandle(e, book)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors"> {book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
