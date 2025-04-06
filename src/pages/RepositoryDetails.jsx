// src/pages/RepositoryDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchRepositoriesByUsername,
  fetchRepositoryContributors,
} from "../services/github.service";
import {
  FaStar,
  FaCode,
  FaCalendarAlt,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";

const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      try {
        // Fetch repository details
        const response = await fetchRepositoriesByUsername(username);
        const repos = response.data;
        const repo = repos.find((r) => r.name === repoName);

        if (repo) {
          setRepository(repo);

          // Fetch contributors
          try {
            const contributorsData = await fetchRepositoryContributors(
              username,
              repoName
            );
            setContributors(contributorsData.data.slice(0, 5)); // Get top 5 contributors
          } catch (contributorErr) {
            console.error("Error fetching contributors:", contributorErr);
            // Still show repo details even if contributors can't be fetched
          }
        } else {
          setError("Repository not found");
        }
      } catch (err) {
        setError(
          "Error fetching repository details: " +
            (err.message || "Unknown error")
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  const handleBack = () => {
    navigate("/");
  };

  if (loading)
    return <div className="loading">Loading repository details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!repository) return <div className="error">Repository not found</div>;

  return (
    <div className="repository-details">
      <button onClick={handleBack} className="back-button">
        <FaArrowLeft /> Back to search results
      </button>

      <h1>{repository.name}</h1>
      <p className="description">
        {repository.description || "No description available"}
      </p>

      <div className="repo-meta">
        <div className="meta-item">
          <span className="label">
            <FaCode />
          </span>
          <span className="value">{repository.language || "Various"}</span>
        </div>
        <div className="meta-item">
          <span className="label">
            <FaStar />
          </span>
          <span className="value">{repository.stargazers_count}</span>
        </div>
        <div className="meta-item">
          <span className="label">
            <FaCalendarAlt />
          </span>
          <span className="value">
            {new Date(repository.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <FaExternalLinkAlt /> View on GitHub
      </a>

      <h2>Top Contributors</h2>
      {contributors.length > 0 ? (
        <div className="contributors-list">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="contributor">
              <img
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
                className="avatar"
              />
              <div className="contributor-info">
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contributor.login}
                </a>
                <span className="commits">
                  {contributor.contributions} commits
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No contributors found</p>
      )}
    </div>
  );
};

export default RepositoryDetails;
