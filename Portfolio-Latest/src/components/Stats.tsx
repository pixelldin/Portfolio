import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Stats() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = 'portfolioVisitorCounted';
    const hasCounted = sessionStorage.getItem(sessionKey);

    const fetchAndIncrement = async () => {
      try {
        if (!hasCounted) {
          // Increment the count atomically in Supabase
          const { data, error } = await supabase.rpc('increment_visitor_count');
          if (!error && data !== null) {
            setVisitorCount(data);
            sessionStorage.setItem(sessionKey, 'true');
          } else {
            console.error('Error incrementing visitor count:', error);
            // fallback: just fetch the count
            const { data: row, error: fetchError } = await supabase
              .from('visitor_count')
              .select('count')
              .eq('id', 1)
              .single();
            if (fetchError) {
              console.error('Error fetching visitor count:', fetchError);
              setVisitorCount(0);
            } else {
              setVisitorCount(row?.count || 0);
              sessionStorage.setItem(sessionKey, 'true');
            }
          }
        } else {
          // Just fetch the count
          const { data: row, error } = await supabase
            .from('visitor_count')
            .select('count')
            .eq('id', 1)
            .single();
          if (error) {
            console.error('Error fetching visitor count:', error);
            setVisitorCount(0);
          } else {
            setVisitorCount(row?.count || 0);
          }
        }
      } catch (error) {
        console.error('Error in fetchAndIncrement:', error);
        setVisitorCount(0);
      }
    };
    fetchAndIncrement();
  }, []);

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
        {visitorCount !== null ? visitorCount.toLocaleString() : '...'} views
      </span>
      <span className="stat-separator">·</span>
      <a
        href="https://github.com/Cheggin/Portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="stat-item stat-link"
      >
        {githubStars !== null ? githubStars : '...'} ★
      </a>
    </div>
  );
}
