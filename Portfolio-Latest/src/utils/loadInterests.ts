export interface Interest {
  id: string;
  title: string;
  order: number;
  Component: React.ComponentType;
}

export async function loadInterests(): Promise<Interest[]> {
  const modules = import.meta.glob('../content/interests/*.mdx', { eager: true });

  const interests: Interest[] = [];

  for (const path in modules) {
    const module = modules[path] as any;
    const frontmatter = module.frontmatter || {};

    const filename = path.split('/').pop()?.replace('.mdx', '') || '';

    interests.push({
      id: filename,
      title: frontmatter.title || 'Untitled',
      order: frontmatter.order || 999,
      Component: module.default,
    });
  }

  // Sort by order
  interests.sort((a, b) => a.order - b.order);

  return interests;
}
