// src/components/SearchBar.jsx
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [username, setUsername] = useState(initialValue);

  useEffect(() => {
    setUsername(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., facebook, vercel, microsoft)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
