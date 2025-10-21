export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  Component: React.ComponentType;
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const modules = import.meta.glob('../content/blog/*.mdx', { eager: true });

  const posts: BlogPost[] = [];

  for (const path in modules) {
    const module = modules[path] as any;
    const frontmatter = module.frontmatter || {};

    // Extract filename without extension for the ID
    const filename = path.split('/').pop()?.replace('.mdx', '') || '';

    posts.push({
      id: filename,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || '',
      readTime: frontmatter.readTime || '',
      excerpt: frontmatter.excerpt || '',
      tags: frontmatter.tags || [],
      Component: module.default,
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
