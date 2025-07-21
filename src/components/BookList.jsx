import React from "react";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p>No books to display.</p>;
  }

  return (
    <div className="booklist-container">
      {books.map((book) => {
        const coverId = book.cover_i;
        return (
          <div key={book.key} className="book-card">
            <img
              src={
                coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                  : "https://via.placeholder.com/150x220?text=No+Cover"
              }
              alt={book.title}
              className="book-cover"
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">
              {book.author_name
                ? book.author_name.join(", ")
                : book.authors
                ? book.authors.map((a) => a.name).join(", ")
                : "Unknown Author"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
