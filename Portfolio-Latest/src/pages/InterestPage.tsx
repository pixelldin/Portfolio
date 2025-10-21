import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadInterests, Interest } from '../utils/loadInterests';

export default function InterestPage() {
  const { id } = useParams<{ id: string }>();
  const [interest, setInterest] = useState<Interest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterests().then((items) => {
      const found = items.find((i) => i.id === id);
      setInterest(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="section">
        <p className="body-text">Loading...</p>
      </div>
    );
  }

  if (!interest) {
    return (
      <div className="section">
        <h2 className="section-heading">Interest Not Found</h2>
        <Link to="/interests" className="body-text" style={{ textDecoration: 'underline' }}>
          ← Back to interests
        </Link>
      </div>
    );
  }

  const { Component, title } = interest;

  return (
    <div className="section">
      <Link
        to="/interests"
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          marginBottom: '2rem',
          display: 'inline-block',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
      >
        ← Back to interests
      </Link>

      <article style={{ maxWidth: '900px' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          fontWeight: '400',
          lineHeight: '1.2'
        }}>
          {title}
        </h1>

        <div className="blog-content">
          <Component />
        </div>
      </article>
    </div>
  );
}
