// 🚀 FINAL CLEAN, FUNCTIONAL, SCALABLE BOOK APP WITH CATEGORIES ON TOP
// App.jsx

import React, { useState } from "react";
import CategoryMenu from "./components/CategoryMenu.jsx";
import TrendingBooks from "./components/TrendingBooks.jsx";
import BookList from "./components/BookList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ToggleButton from "./components/ToggleButton.jsx";
import logo from "./assets/logo.jpg";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleCategoryChange = (category, books) => {
    setSelectedCategory(category);
    setCategoryBooks(books);
    setIsSearching(false); // stop searching if a category is selected
  };

  return (
    <>
      <img src={logo} alt="Book App Banner" className="header-banner" />

      <header className="header-content">
        <h1 className="app-title" style={{ textAlign: "center", flex: 1 }}>
          Let’s dive into the world of books
        </h1>
        <ToggleButton />
      </header>

      <main className="main-content">
        <SearchBar
          onSearchResults={(results, searching) => {
            setSearchResults(results);
            setIsSearching(searching);
            if (searching) {
              setSelectedCategory("");
              setCategoryBooks([]);
            }
          }}
        />

        {isSearching ? (
          <>
            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
              <BookList books={searchResults} />
            ) : (
              <p>No books found for your search.</p>
            )}
          </>
        ) : selectedCategory ? (
          <>
            <h2>Books in: {selectedCategory.replace("_", " ")}</h2>
            {categoryBooks.length > 0 ? (
              <BookList books={categoryBooks} />
            ) : (
              <p>No books found in this category.</p>
            )}
          </>
        ) : (
          <>
            <CategoryMenu
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <h2>Trending Books</h2>
            <TrendingBooks />
          </>
        )}
      </main>

      <footer className="footer-content">
        © {new Date().getFullYear()} Rawen Zgarni. All rights reserved.
      </footer>
    </>
  );
}
