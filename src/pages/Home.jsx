// src/pages/Home.jsx (simplified)
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RepositoryList from "../components/RepositoryList";
import { fetchRepositoriesByUsername } from "../services/github.service";

const Home = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  // Load previous search results from sessionStorage when returning to this page
  useEffect(() => {
    const savedState = sessionStorage.getItem("github_explorer_state");
    if (savedState) {
      try {
        const { username: savedUsername, repositories: savedRepos } =
          JSON.parse(savedState);
        if (savedUsername && savedRepos && savedRepos.length > 0) {
          setUsername(savedUsername);
          setRepositories(savedRepos);
          setFromCache(true);
        }
      } catch (err) {
        console.error("Error parsing saved state:", err);
        sessionStorage.removeItem("github_explorer_state");
      }
    }
  }, []);

  // Save state to sessionStorage when navigating away
  useEffect(() => {
    return () => {
      if (username && repositories.length > 0) {
        try {
          sessionStorage.setItem(
            "github_explorer_state",
            JSON.stringify({
              username,
              repositories,
            })
          );
        } catch (err) {
          console.error("Error saving state:", err);
        }
      }
    };
  }, [username, repositories]);

  const handleSearch = async (searchUsername) => {
    // Skip if it's the same search and we already have results
    if (searchUsername === username && repositories.length > 0) {
      return;
    }

    setUsername(searchUsername);
    setLoading(true);
    setError(null);
    setFromCache(false);

    try {
      const response = await fetchRepositoriesByUsername(searchUsername);
      setRepositories(response.data);
      setFromCache(response.fromCache);
    } catch (err) {
      setError(err.message || "Error fetching repositories. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h1>GitHub Repository Explorer</h1>
      <SearchBar onSearch={handleSearch} initialValue={username} />

      {fromCache && (
        <div className="cache-notice">
          <span>🚀 Results loaded from cache for faster experience!</span>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {!error && repositories.length > 0 && (
        <RepositoryList repositories={repositories} username={username} />
      )}

      {!error && repositories.length === 0 && username && !loading && (
        <div className="no-results">
          No repositories found for user: {username}
        </div>
      )}

      {loading && <div className="loading">Loading repositories...</div>}
    </div>
  );
};

export default Home;
