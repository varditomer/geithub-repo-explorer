// src/components/RepositoryList.jsx
import { useState, useEffect } from "react";
import RepositoryItem from "./RepositoryItem";

const RepositoryList = ({ repositories, username }) => {
  const [sortedRepos, setSortedRepos] = useState([]);
  const [sortDirection, setSortDirection] = useState("none"); // 'none', 'asc', or 'desc'

  useEffect(() => {
    // Update sorted repos when repositories prop changes
    setSortedRepos([...repositories]);
    setSortDirection("none");
  }, [repositories]);

  const handleSortByStars = () => {
    let sorted;
    let newDirection;

    if (sortDirection === "none" || sortDirection === "asc") {
      // Sort descending (high to low)
      sorted = [...sortedRepos].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      newDirection = "desc";
    } else {
      // Sort ascending (low to high)
      sorted = [...sortedRepos].sort(
        (a, b) => a.stargazers_count - b.stargazers_count
      );
      newDirection = "asc";
    }

    setSortedRepos(sorted);
    setSortDirection(newDirection);
  };

  const getSortButtonText = () => {
    switch (sortDirection) {
      case "desc":
        return "Sort by Stars (High to Low)";
      case "asc":
        return "Sort by Stars (Low to High)";
      default:
        return "Sort by Stars";
    }
  };

  return (
    <div className="repository-list">
      <div className="repository-controls">
        <button onClick={handleSortByStars}>{getSortButtonText()}</button>
      </div>
      <div className="repositories">
        {sortedRepos.map((repo) => (
          <RepositoryItem key={repo.id} repo={repo} username={username} />
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
