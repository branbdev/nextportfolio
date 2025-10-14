export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
}

// Function to extract tags from both blog posts and portfolio items
export const extractTags = (items: { tags?: string[] }[]): string[] => {
  const allTags = items.flatMap(item => item.tags || []);
  return [...new Set(allTags)].sort();
};

// Function to filter items by tag
export const filterByTag = <T extends { tags?: string[] }>(
  items: T[],
  tag: string
): T[] => {
  return tag ? items.filter(item => item.tags?.includes(tag)) : items;
};

// Function to suggest related content based on tags
export const getRelatedContent = <T extends { tags?: string[]; slug?: string }>(
  item: T,
  allItems: T[],
  maxItems: number = 3
): T[] => {
  if (!item.tags || item.tags.length === 0) return [];

  // Filter out the current item
  const otherItems = allItems.filter(other => other.slug !== item.slug);
  
  // Calculate tag overlap score
  const scoredItems = otherItems.map(other => {
    const overlapCount = other.tags?.filter(tag => item.tags?.includes(tag)).length || 0;
    return { item: other, score: overlapCount };
  });

  // Sort by score and return top N
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .filter(i => i.score > 0)
    .slice(0, maxItems)
    .map(i => i.item);
};
