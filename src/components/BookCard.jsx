import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import { databases } from "../appwriteClient";

const DATABASE_ID = "687b68730024f258bbe1";
const COLLECTION_ID = "687b6895000e79a4bc86";

function TrendingBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

        if (response.documents && response.documents.length > 0) {
          const booksData = response.documents.map((doc) => ({
            key: doc.openLibraryKey || doc.$id,
            title: doc.title || "Untitled",
            author_name: [doc.author || "Unknown Author"],
            description: doc.description || "",
            image: doc.image || "",
            cover_i: null,
          }));
          setBooks(booksData);
          setError(null);
        } else {
          setError("No trending books found.");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load trending books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <section className="trending-books-section">
      <h2 className="section-title">Let's Dive Into the World of Books</h2>
      {loading && <p>Loading trending books...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && books.length > 0 && <BookList books={books} />}
    </section>
  );
}

export default TrendingBooks;
