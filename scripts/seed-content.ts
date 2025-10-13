// This script generates sample blog posts and projects for testing
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define content directories
const contentDir = path.join(process.cwd(), 'content');
const blogDir = path.join(contentDir, 'blog');
const projectsDir = path.join(contentDir, 'projects');

// Ensure directories exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir);
}
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

// Sample blog posts
const blogPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2025-10-01',
    author: 'Brandon Bowen',
    excerpt: 'Next.js is a powerful React framework that helps you build fast and SEO-friendly web applications.',
    tags: ['React', 'Next.js', 'JavaScript'],
    coverImage: '/img/blog/nextjs-cover.jpg',
    content: `
# Getting Started with Next.js

Next.js is a powerful React framework that helps you build fast and SEO-friendly web applications.

## Why Next.js?

Next.js provides several benefits over a plain React application:

- **Server-side rendering (SSR)** - Renders pages on the server for better SEO
- **Static site generation (SSG)** - Pre-renders pages at build time for blazing fast performance
- **API Routes** - Create API endpoints as part of your Next.js app
- **File-based routing** - Simple and intuitive page-based routing system
- **Built-in CSS and Sass support** - Style your application with ease

## Setting Up a Next.js Project

Let's start by creating a new Next.js project:

\`\`\`bash
npx create-next-app my-next-app
\`\`\`

This will create a new Next.js project with all the necessary dependencies and configuration.

## Creating Your First Page

In Next.js, pages are React components exported from files in the \`pages\` directory. The file path determines the route.

For example, create a file at \`pages/about.js\`:

\`\`\`jsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page of our Next.js application.</p>
    </div>
  );
}
\`\`\`

Now you can access this page at \`/about\`.

## Data Fetching

Next.js provides several methods for data fetching:

### getStaticProps

For static site generation (SSG):

\`\`\`jsx
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: {
      data,
    },
  };
}
\`\`\`

### getServerSideProps

For server-side rendering (SSR):

\`\`\`jsx
export async function getServerSideProps() {
  const data = await fetchData();
  
  return {
    props: {
      data,
    },
  };
}
\`\`\`

## Conclusion

Next.js is an excellent framework for building modern web applications. With its powerful features and simple API, it makes creating fast and SEO-friendly React applications a breeze.

In future posts, we'll explore more advanced features of Next.js, such as dynamic routes, API routes, and optimization techniques.
    `
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for React Applications',
    date: '2025-10-05',
    author: 'Brandon Bowen',
    excerpt: 'Learn how to effectively use TypeScript in your React applications to create more maintainable and bug-free code.',
    tags: ['TypeScript', 'React', 'JavaScript'],
    coverImage: '/img/blog/typescript-cover.jpg',
    content: `
# TypeScript Best Practices for React Applications

TypeScript has become increasingly popular in the React ecosystem, offering improved developer experience through static typing, better tooling, and enhanced code quality.

## Why TypeScript with React?

- **Catch errors early**: TypeScript can catch many errors at compile-time that would otherwise only surface at runtime
- **Improved IDE support**: Get better autocompletion, type checking, and refactoring tools
- **Self-documenting code**: Types serve as documentation for your components and functions
- **Safer refactoring**: Confidently refactor your code with TypeScript's type checking

## Setting Up TypeScript with React

If you're starting a new project, you can use Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

For Next.js:

\`\`\`bash
npx create-next-app --typescript
\`\`\`

## Typing Component Props

One of the most important aspects of using TypeScript with React is properly typing your component props:

\`\`\`tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
\`\`\`

## Hooks with TypeScript

### useState

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

### useRef

\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

### useContext

\`\`\`tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Usage
const { theme, toggleTheme } = useContext(ThemeContext)!;
\`\`\`

## Common TypeScript Patterns in React

### Typing Event Handlers

\`\`\`tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Submit form
};
\`\`\`

### Children Props

\`\`\`tsx
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};
\`\`\`

### Function Props with Parameters

\`\`\`tsx
interface ItemProps {
  item: Item;
  onDelete: (id: number) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onDelete }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};
\`\`\`

## Advanced Types

### Discriminated Unions for State Management

\`\`\`tsx
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: User[] }
  | { status: 'error', error: Error };

const [state, setState] = useState<State>({ status: 'idle' });

// Usage
if (state.status === 'loading') {
  return <Spinner />;
} else if (state.status === 'success') {
  return <UserList users={state.data} />;
} else if (state.status === 'error') {
  return <ErrorMessage error={state.error} />;
}
\`\`\`

## Conclusion

TypeScript provides significant benefits when used with React, helping you build more robust applications with fewer bugs. By following these best practices, you can make the most of TypeScript in your React projects.

In future articles, we'll explore more advanced TypeScript patterns and techniques for React applications.
    `
  }
];

// Sample project data
const projects = [
  {
    slug: 'e-commerce-platform',
    title: 'E-commerce Platform',
    excerpt: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB',
    description: 'A comprehensive e-commerce solution with product management, cart functionality, payment processing, and admin dashboard.',
    date: '2025-09-15',
    client: 'RetailTech Inc.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    coverImage: '/img/portfolio/ecommerce.jpg',
    content: `
# E-commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Product catalog with categories and search
- User authentication and profiles
- Shopping cart and checkout process
- Payment processing with Stripe
- Order management and tracking
- Admin dashboard for product and order management

## Technologies Used

- **Frontend**: React, Redux, Material UI
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Stripe API
- **Deployment**: Docker, AWS

## Project Challenges

One of the main challenges was implementing real-time inventory updates and ensuring consistency between the cart and actual product availability. We solved this by implementing optimistic UI updates with backend validation.
    `
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    excerpt: 'A productivity application built with Angular and .NET Core',
    description: 'A collaborative task management application with real-time updates, task assignments, and progress tracking.',
    date: '2025-08-20',
    client: 'ProductivityPlus',
    tags: ['Angular', 'C#', '.NET', 'SQL Server'],
    coverImage: '/img/portfolio/task-management.jpg',
    content: `
# Task Management Application

A collaborative task management application built with Angular and .NET Core.

## Features

- Task creation, assignment, and tracking
- Project organization and milestones
- Real-time updates using SignalR
- Time tracking and reporting
- Team collaboration tools
- File attachments and comments

## Technologies Used

- **Frontend**: Angular 15, NgRx, Angular Material
- **Backend**: .NET 7, Entity Framework Core
- **Database**: SQL Server
- **Real-time**: SignalR
- **Authentication**: IdentityServer4
- **Deployment**: Azure App Service

## Project Challenges

The biggest challenge was implementing a performant real-time collaboration system that could scale to handle hundreds of simultaneous users. We used SignalR with a Redis backplane to achieve this.
    `
  }
];

// Function to create a directory if it doesn't exist
function createDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to write a blog post
function createBlogPost(post: any) {
  const postDir = path.join(blogDir, post.slug);
  createDirectory(postDir);
  
  const mediaDir = path.join(postDir, 'media');
  createDirectory(mediaDir);
  
  // Create frontmatter and content
  const frontmatter = {
    title: post.title,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    tags: post.tags,
    coverImage: post.coverImage || null,
  };
  
  const fileContent = matter.stringify(post.content, frontmatter);
  fs.writeFileSync(path.join(postDir, 'index.mdx'), fileContent);
  
  console.log(`✅ Created blog post: ${post.slug}`);
}

// Function to write a project
function createProject(project: any) {
  const projectDir = path.join(projectsDir, project.slug);
  createDirectory(projectDir);
  
  // Create frontmatter and content
  const frontmatter = {
    title: project.title,
    excerpt: project.excerpt,
    description: project.description,
    date: project.date,
    client: project.client,
    tags: project.tags,
    coverImage: project.coverImage || null,
  };
  
  const fileContent = matter.stringify(project.content, frontmatter);
  fs.writeFileSync(path.join(projectDir, 'index.mdx'), fileContent);
  
  console.log(`✅ Created project: ${project.slug}`);
}

// Generate content
console.log('🚀 Generating sample content...');
blogPosts.forEach(createBlogPost);
projects.forEach(createProject);
console.log('✅ All content generated successfully!');