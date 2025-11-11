import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Stats() {
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const views = useQuery(api.myFunctions.getViews);
  const incrementViews = useMutation(api.myFunctions.incrementViews);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    const sessionKey = 'portfolioVisitorCounted';
    const hasCounted = sessionStorage.getItem(sessionKey);

    if (!hasCounted && incrementViews && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      incrementViews()
        .then(() => {
          sessionStorage.setItem(sessionKey, 'true');
        })
        .catch((error) => {
          console.error('Error incrementing views:', error);
        });
    }
  }, [incrementViews]);

  // Fetch GitHub star count
  useEffect(() => {
    const fetchGithubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Cheggin/Portfolio');

        if (!response.ok) {
          console.error(`GitHub API error! status: ${response.status}`);
          setGithubStars(0);
          return;
        }

        const data = await response.json();
        console.log('GitHub stars fetched:', data.stargazers_count);
        setGithubStars(data.stargazers_count || 0);
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
        setGithubStars(0);
      }
    };

    fetchGithubStars();
  }, []);

  return (
    <div className="stats-container">
      <span className="stat-item">
        {views !== undefined ? views.toLocaleString() : '...'} views
      </span>
      <span className="stat-separator">·</span>
      <a
        href="https://github.com/pixelldin/Portfolio-Latest"
        target="_blank"
        rel="noopener noreferrer"
        className="stat-item stat-link"
      >
        {githubStars !== null ? githubStars : '...'} ★
      </a>
    </div>
  );
}
