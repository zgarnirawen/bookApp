import React, { useState } from "react";

const categories = [
  "science_fiction",
  "fantasy",
  "romance",
  "mystery",
  "history",
  "biographies",
];

export default function CategoryMenu({ onCategoryChange, selectedCategory }) {
  const [loading, setLoading] = useState(false);

  const fetchCategory = (category) => {
    setLoading(true);
    fetch(`https://openlibrary.org/subjects/${category}.json?limit=20`)
      .then((res) => res.json())
      .then((data) => {
        // Remap works pour correspondre à BookList
        const books = (data.works || []).map((work) => ({
          key: work.key,
          title: work.title,
          author_name: work.authors ? work.authors.map((a) => a.name) : ["Unknown Author"],
          cover_i: work.cover_id || (work.cover && work.cover.id) || null,
        }));
        onCategoryChange(category, books);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        onCategoryChange(category, []);
        setLoading(false);
      });
  };

  return (
    <div className="category-menu-container">
      <h2>📚 Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-btn ${selectedCategory === category ? "selected" : ""}`}
              onClick={() => fetchCategory(category)}
              disabled={loading}
            >
              {category.replace("_", " ").toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      {loading && <p>Loading category books...</p>}
    </div>
  );
}
