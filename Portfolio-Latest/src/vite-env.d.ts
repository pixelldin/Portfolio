/// <reference types="vite/client" />

declare module '*.mdx' {
  import { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
  export const frontmatter: {
    title?: string;
    date?: string;
    readTime?: string;
    excerpt?: string;
    tags?: string[];
  };
}
