import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaStar, FaCodeBranch, FaEye, FaUsers } from "react-icons/fa";
import "./GitHubStats.css";

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
  language: string;
  updated_at: string;
}

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [allRepos, setAllRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          "https://api.github.com/users/JessicaMulein"
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch repositories from both personal and Digital-Defiance org
        const [personalReposResponse, orgReposResponse] = await Promise.all([
          fetch("https://api.github.com/users/JessicaMulein/repos?sort=updated&per_page=100"),
          fetch("https://api.github.com/orgs/Digital-Defiance/repos?sort=updated&per_page=100")
        ]);
        
        if (!personalReposResponse.ok || !orgReposResponse.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const personalRepos = await personalReposResponse.json();
        const orgRepos = await orgReposResponse.json();
        
        // Combine all repos
        const allRepos = [...personalRepos, ...orgRepos];
        setAllRepos(allRepos);

        // Sort by stars and take top 6
        const sortedRepos = allRepos
          .sort(
            (a: Repository, b: Repository) =>
              b.stargazers_count - a.stargazers_count
          )
          .slice(0, 6);
        setRepos(sortedRepos);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <section className="github-stats" id="github">
        <div className="github-stats-container">
          <div className="loading">Loading GitHub stats...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="github-stats" id="github">
        <div className="github-stats-container">
          <div className="error">Failed to load GitHub stats</div>
        </div>
      </section>
    );
  }

  const totalStars = allRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = allRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalRepos = allRepos.length;

  return (
    <section className="github-stats" id="github" ref={ref}>
      <motion.div
        className="github-stats-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={itemVariants}
        >
          GitHub Activity
        </motion.h2>

        {user && (
          <motion.div className="stats-overview" variants={itemVariants}>
            <div className="stat-card glass">
              <FaCodeBranch className="stat-icon" />
              <div className="stat-value">{totalRepos}</div>
              <div className="stat-label">Total Repos</div>
            </div>
            <div className="stat-card glass">
              <FaStar className="stat-icon" />
              <div className="stat-value">{totalStars}</div>
              <div className="stat-label">Total Stars</div>
            </div>
            <div className="stat-card glass">
              <FaCodeBranch className="stat-icon" />
              <div className="stat-value">{totalForks}</div>
              <div className="stat-label">Total Forks</div>
            </div>
            <div className="stat-card glass">
              <FaUsers className="stat-icon" />
              <div className="stat-value">{user.followers}</div>
              <div className="stat-label">Followers</div>
            </div>
          </motion.div>
        )}

        <motion.div className="top-repos" variants={itemVariants}>
          <h3>Top Repositories by Stars</h3>
          <div className="repos-grid">
            {repos.map((repo, index) => (
              <motion.a
                key={index}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card glass"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="repo-header">
                  <h4>{repo.name}</h4>
                  {repo.language && (
                    <span className="language-badge">{repo.language}</span>
                  )}
                </div>
                <p className="repo-description">
                  {repo.description || "No description available"}
                </p>
                <div className="repo-stats">
                  <span>
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span>
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span>
                    <FaEye /> {repo.watchers_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GitHubStats;
