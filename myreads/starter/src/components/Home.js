import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

const Home = () => {
  const [currentlyReadingList, setCurrentlyReadingList] = useState([]);
  const [wantToReadList, setWantToReadList] = useState([]);
  const [readList, setReadList] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setCurrentlyReadingList(
          books.filter((bookitem) => bookitem.shelf === "currentlyReading")
        );
      })
      .catch((error) => console.log("from app component current filter"));

    BooksAPI.getAll()
      .then((books) => {
        setWantToReadList(
          books.filter((bookitem) => bookitem.shelf === "wantToRead")
        );
      })
      .catch((error) => console.log("from app component waqntread filter"));

    BooksAPI.getAll()
      .then((books) => {
        setReadList(books.filter((bookitem) => bookitem.shelf === "read"));
      })
      .catch((error) => console.log("from app component read filter"));

    return () => {};
  }, [currentlyReadingList]);
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>Book Shelves</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title={"Currently Reading"} books={currentlyReadingList} />
          <BookShelf title={"Want To Read"} books={wantToReadList} />
          <BookShelf title={"Read"} books={readList} />
        </div>
        <div className="open-search">
          <Link to={"/search"}>Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
