import React, { useState, useEffect } from "react";
import BookList from "./BookList.jsx";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setBooks([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          const mappedBooks = data.docs.map((doc) => ({
            key: doc.key,
            title: doc.title || "Untitled",
            author_name: doc.author_name || ["Unknown Author"],
            cover_i: doc.cover_i || null,
          }));
          setBooks(mappedBooks);
          setShowResults(true);
        })
        .catch(console.error);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="searchbar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search for books..."
        className="search-input"
      />
      {showResults && <BookList books={books} />}
    </div>
  );
}
