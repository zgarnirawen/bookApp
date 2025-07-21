import React, { useState, useEffect } from "react";
import BookList from "./BookList";

export default function TrendingBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=programming&limit=20"
        );
        const data = await res.json();
        const booksData = data.docs.map((doc) => ({
          key: doc.key,
          title: doc.title || "Untitled",
          author_name: doc.author_name || ["Unknown Author"],
          cover_i: doc.cover_i || null,
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch trending books", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  return loading ? <p>Loading trending books...</p> : <BookList books={books} />;
}
