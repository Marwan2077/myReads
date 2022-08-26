import * as BooksAPI from "../BooksAPI";

const BookSearch = ({ books }) => {
  const changeBookHandle = (e, book) => {
    BooksAPI.update(book, e.target.value);
  };

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
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
                    value={book.shelf !== undefined ? book.shelf : "none"}
                    onChange={(e) => changeBookHandle(e, book)}
                  >
                    <option value="" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
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
  );
};

export default BookSearch;
