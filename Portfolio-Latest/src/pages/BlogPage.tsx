/*
 * BLOG POST FORMATTING GUIDE
 *
 * To add a new blog post, add an object to the blogPosts array below with this structure:
 *
 * {
 *   id: "unique-slug-for-url",
 *   title: "Your Blog Post Title",
 *   date: "Month DD, YYYY",
 *   readTime: "X min read",
 *   excerpt: "A brief 1-2 sentence summary that appears in the blog list view",
 *   tags: ["tag1", "tag2", "tag3"],
 *   content: `
 *     Full blog post content goes here. You can use plain text or markdown.
 *
 *     Use multiple paragraphs, lists, code snippets, etc.
 *   `
 * }
 */

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
}

const blogPosts: BlogPost[] = [
    // Example:
    // {
    //   id: STRING,
    //   title: STRING,
    //   date: "MM DD, YYYY",
    //   readTime: "X min read",
    //   excerpt: STRING,
    //   tags: ["STRING", "STRING", "STRING"],
    //   content: `
    //     Content goes here...
    //   `
    // }
    ];

export default function BlogPage() {
  if (blogPosts.length === 0) {
    return (
      <div className="section">
        <h2 className="section-heading">Writing</h2>
        <p className="body-text">
          Coming soon. Thoughts on AI, software engineering, and building products.
        </p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="section-heading">Writing</h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        marginTop: '3rem',
        maxWidth: '900px'
      }}>
        {blogPosts.map((post) => (
          <article
            key={post.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '3rem',
              alignItems: 'start'
            }}
          >
            {/* Left side: Date and read time */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.95rem'
            }}>
              <div>{post.date}</div>
              <div>{post.readTime}</div>
            </div>

            {/* Right side: Title and description */}
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '0.75rem',
                fontWeight: '400',
                borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
                paddingBottom: '2px',
                display: 'inline-block'
              }}>
                {post.title}
              </h3>

              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
