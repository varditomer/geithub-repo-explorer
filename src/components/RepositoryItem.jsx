// src/components/RepositoryItem.jsx
import { useNavigate } from "react-router-dom";
import { FaStar, FaCode } from "react-icons/fa";

const RepositoryItem = ({ repo, username }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/repository/${username}/${repo.name}`);
  };

  return (
    <div className="repository-item" onClick={handleClick}>
      <h3>{repo.name}</h3>
      <p>{repo.description || "No description available"}</p>
      <div className="repository-stats">
        <span className="language">
          <FaCode /> {repo.language || "Various"}
        </span>
        <span className="stars">
          <FaStar /> {repo.stargazers_count}
        </span>
      </div>
    </div>
  );
};

export default RepositoryItem;
