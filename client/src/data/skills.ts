export interface SkillItem {
  name: string;
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS';
  level: string;
  iconName: string;
  description: string;
  featured?: boolean;
}

export const skillsCategories = ['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS'] as const;

export const skillsData: SkillItem[] = [
  // FRONTEND
  {
    name: 'React.js',
    category: 'FRONTEND',
    level: 'Advanced',
    iconName: 'Atom',
    description: 'Component architecture, custom hooks, context, state management and concurrent rendering.',
    featured: true,
  },
  {
    name: 'TypeScript',
    category: 'FRONTEND',
    level: 'Proficient',
    iconName: 'FileCode2',
    description: 'Type-safe frontend codebases, interfaces, generics, and strict compile-time verification.',
    featured: true,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'FRONTEND',
    level: 'Advanced',
    iconName: 'Code',
    description: 'Modern asynchronous programming, closures, event loops, DOM performance, and Web APIs.',
    featured: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'Advanced',
    iconName: 'Palette',
    description: 'Modern utility-first styling, responsive fluid layouts, custom themes, and glassmorphic designs.',
    featured: true,
  },
  {
    name: 'Framer Motion',
    category: 'FRONTEND',
    level: 'Proficient',
    iconName: 'Sparkles',
    description: 'Spring physics, layout animations, gesture recognition, and scroll-linked micro-interactions.',
    featured: true,
  },
  {
    name: 'HTML5 & CSS3',
    category: 'FRONTEND',
    level: 'Advanced',
    iconName: 'Layout',
    description: 'Semantic markup, accessibility (a11y), CSS Grid, Flexbox, and CSS custom properties.',
  },

  // BACKEND
  {
    name: 'Node.js',
    category: 'BACKEND',
    level: 'Advanced',
    iconName: 'Server',
    description: 'Event-driven server runtime, stream pipelines, file handling, and asynchronous workers.',
    featured: true,
  },
  {
    name: 'Express.js',
    category: 'BACKEND',
    level: 'Advanced',
    iconName: 'Cpu',
    description: 'RESTful API architecture, middleware chains, routing, error handling, and security guards.',
    featured: true,
  },
  {
    name: 'Python',
    category: 'BACKEND',
    level: 'Proficient',
    iconName: 'Terminal',
    description: 'Backend scripting, algorithmic data processing, and AI/RAG system orchestration.',
    featured: true,
  },
  {
    name: 'FastAPI',
    category: 'BACKEND',
    level: 'Proficient',
    iconName: 'Zap',
    description: 'High-performance asynchronous REST endpoints, Pydantic schemas, and automatic docs.',
    featured: true,
  },
  {
    name: 'RESTful APIs & JWT',
    category: 'BACKEND',
    level: 'Advanced',
    iconName: 'KeyRound',
    description: 'Token authorization, cryptographic session signing, rate limiting, and CORS configuration.',
    featured: true,
  },

  // DATABASE
  {
    name: 'MongoDB',
    category: 'DATABASE',
    level: 'Advanced',
    iconName: 'Database',
    description: 'Document schemas, aggregation pipelines, strategic indexing, and Mongoose ODM integration.',
    featured: true,
  },
  {
    name: 'MySQL',
    category: 'DATABASE',
    level: 'Proficient',
    iconName: 'HardDrive',
    description: 'Relational data modeling, ACID transactions, join optimization, and relational constraints.',
    featured: true,
  },
  {
    name: 'FAISS Vector Index',
    category: 'DATABASE',
    level: 'Proficient',
    iconName: 'Binary',
    description: 'Dense embedding vector stores for sub-millisecond similarity search in RAG pipelines.',
  },
  {
    name: 'Firebase',
    category: 'DATABASE',
    level: 'Intermediate',
    iconName: 'Flame',
    description: 'Real-time database, cloud hosting, asset storage, and authentication workflows.',
  },

  // TOOLS & CLOUD
  {
    name: 'Git & GitHub',
    category: 'TOOLS',
    level: 'Advanced',
    iconName: 'GitBranch',
    description: 'Version control, branch workflows, pull requests, CI/CD integrations, and collaboration.',
    featured: true,
  },
  {
    name: 'AWS Cloud (S3, EC2)',
    category: 'TOOLS',
    level: 'Proficient',
    iconName: 'Cloud',
    description: 'Cloud object storage, IAM user roles, server deployment, and multi-tenant security.',
    featured: true,
  },
  {
    name: 'Postman',
    category: 'TOOLS',
    level: 'Advanced',
    iconName: 'Send',
    description: 'API testing, automated endpoint collections, mock servers, and payload validation.',
  },
  {
    name: 'Vite & Webpack',
    category: 'TOOLS',
    level: 'Advanced',
    iconName: 'Flame',
    description: 'Fast modern bundler configurations, hot module replacement, and production asset optimization.',
  },
  {
    name: 'Vercel & Render',
    category: 'TOOLS',
    level: 'Advanced',
    iconName: 'Globe',
    description: 'Edge network deployments, automated branch previews, and serverless compute pipelines.',
  },
];
