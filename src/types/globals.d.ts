/**
 * Type declarations for CSS imports
 * Fixes TypeScript false positive: "Cannot find module './globals.css'"
 */

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
