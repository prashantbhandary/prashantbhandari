// CSS module declarations for TypeScript
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// Allow side-effect CSS imports
declare module '*.css';
