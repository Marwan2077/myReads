import { Link } from "react-router-dom";
import BookSearch from "./BookSearch";
import * as BookAPI from "../BooksAPI";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [booksList, setBooksList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 0) {
      BookAPI.search(searchQuery, 14)
        .then((books) => {
          if (books.length > 0) {
            BookAPI.getAll().then((allshelf) => {
              for (let i = 0; i < allshelf.length; i++) {
                const item = allshelf[i];

                let currentShelf = books.filter((b) => b.id === item.id);
                if (currentShelf.length > 0) {
                  currentShelf[0].shelf = item.shelf;
                }
              }
              setBooksList(
                books.filter(
                  (book) =>
                    book.imageLinks !== undefined && book.authors !== undefined
                )
              );
            });

            return true;
          }

          setBooksList([]);
        })
        .catch((error) => console.log(error));
    } else {
      setBooksList([]);
      setSearchQuery("");
    }

    return () => {};
  }, [searchQuery]);

  return (
    <>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"} className={"close-search"}></Link>

          <div className="search-books-input-wrapper">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>

      <BookSearch books={booksList} />
    </>
  );
};

export default Search;
