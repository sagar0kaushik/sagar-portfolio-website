export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  detailedProblem?: string;
  detailedSolution?: string;
  technologies: string[];
  visual: string; // image or visual gradient
  accentColor: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'grovia-ecommerce',
    number: '01',
    name: 'Grovia — E-Commerce Web App',
    category: 'FULL-STACK E-COMMERCE',
    subtitle: 'High-performance reactive grocery commerce engine',
    description:
      'A full-stack grocery e-commerce application built with the MERN stack, featuring reactive cart synchronization, wishlist, product search, responsive UI, and dynamic order handling.',
    detailedProblem:
      'Traditional grocery ordering platforms suffer from fragile client-side cart states, sluggish catalog filtering, and multi-step checkouts leading to abandonment.',
    detailedSolution:
      'Engineered an atomic cart mutation architecture backed by MongoDB document versioning, optimized JWT session verification, and instant optimistic UI updates via Tailwind CSS.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    visual: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    accentColor: '#10b981',
    githubUrl: 'https://github.com/sagar0kaushik/Grovia',
    liveUrl: 'https://grovia-pxbz.vercel.app/',
    featured: true,
    metrics: [
      { label: 'Cart Latency', value: '<50ms' },
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'State Sync', value: 'Optimistic' },
    ],
  },
  {
    id: 'cloud-vault',
    number: '02',
    name: 'Cloud-Vault — Cloud Storage System',
    category: 'CLOUD & FILE STORAGE',
    subtitle: 'Secure multi-tenant cloud asset management platform',
    description:
      'A resilient full-stack cloud storage application featuring user-centric file management, asset streaming, chunked uploads, and strict IAM token isolation.',
    detailedProblem:
      'Handling large unstructured file uploads without memory buffer overflow or unauthorized cross-tenant object access.',
    detailedSolution:
      'Designed a streaming pipe architecture with AWS S3 / cloud object storage, signed upload links, cryptographic JWT route guards, and relational metadata tracking.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'AWS S3', 'MongoDB', 'JWT'],
    visual: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    accentColor: '#3b82f6',
    githubUrl: 'https://github.com/sagar0kaushik',
    liveUrl: 'https://github.com/sagar0kaushik',
    featured: true,
    metrics: [
      { label: 'Upload Pipeline', value: 'Chunked Streams' },
      { label: 'Storage Layer', value: 'AWS S3 / Cloud' },
      { label: 'Security', value: 'JWT Multi-Tenant' },
    ],
  },
  {
    id: 'rag-document-chatbot',
    number: '03',
    name: 'AI Document Chatbot — RAG',
    category: 'AI & VECTOR SEARCH',
    subtitle: 'Retrieval-Augmented Generation document intelligence platform',
    description:
      'High-throughput document question-answering system using RAG, Sentence Transformers dense embeddings, Meta FAISS vector index, and Groq Cloud LLM.',
    detailedProblem:
      'Standard LLMs hallucinate when asked about proprietary documents, while passing whole multi-hundred page PDFs exceeds token limits and causes extreme response latency.',
    detailedSolution:
      'Constructed an end-to-end RAG pipeline that partitions PDFs into semantic chunks with overlap, generates 384-dimensional vector embeddings, retrieves top-k vectors in sub-15ms using FAISS, and synthesizes answers via Groq LLM with source citations.',
    technologies: ['Python', 'FastAPI / Flask', 'FAISS', 'Sentence Transformers', 'Groq LLM', 'React.js'],
    visual: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    accentColor: '#06b6d4',
    githubUrl: 'https://github.com/sagar0kaushik/RAG-Document-Chatbot',
    liveUrl: 'https://github.com/sagar0kaushik/RAG-Document-Chatbot',
    featured: true,
    metrics: [
      { label: 'Vector Retrieval', value: '<15ms' },
      { label: 'Vector Index', value: 'Meta FAISS' },
      { label: 'Embeddings', value: '384-dim Dense' },
    ],
  },
  {
    id: 'bank-management-system',
    number: '04',
    name: 'Bank Management System',
    category: 'FULL-STACK FINANCIAL SYSTEM',
    subtitle: 'Zero-trust financial ledger & transaction engine',
    description:
      'A secure full-stack banking application with account lifecycle management, multi-tiered user authorization, atomic fund transfers, and immutable transaction logs.',
    detailedProblem:
      'Financial applications require strict mitigation against race conditions, balance underflow, replay exploits, and unauthorized teller route access.',
    detailedSolution:
      'Built an auditable transaction ledger with cryptographically signed JWT tokens, server-enforced atomic balance verification, and role-based access control protecting customer vs. manager actions.',
    technologies: ['Python', 'FastAPI', 'React.js', 'MongoDB', 'JWT', 'Postman'],
    visual: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    accentColor: '#6366f1',
    githubUrl: 'https://github.com/sagar0kaushik/Bank-Management-System',
    liveUrl: 'https://github.com/sagar0kaushik/Bank-Management-System',
    featured: true,
    metrics: [
      { label: 'Security Model', value: 'Zero-Trust JWT' },
      { label: 'Transactions', value: 'Atomic Ledger' },
      { label: 'API Framework', value: 'FastAPI Async' },
    ],
  },
  {
    id: 'student-management-system',
    number: '05',
    name: 'Student Management System',
    category: 'ACADEMIC RECORD PLATFORM',
    subtitle: 'Enterprise academic record and lifecycle management system',
    description:
      'Full-stack student management application with RESTful CRUD APIs, schema request validation, course enrollment tracking, and MongoDB-backed records.',
    detailedProblem:
      'Academic departments frequently encounter fragmented student spreadsheets, conflicting course enrollments, and unvalidated data entry.',
    detailedSolution:
      'Engineered a centralized, schema-validated REST API layer in FastAPI using Pydantic models, integrated with MongoDB collections and interactive React dashboards.',
    technologies: ['FastAPI', 'React.js', 'MongoDB', 'Python', 'Tailwind CSS'],
    visual: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
    accentColor: '#14b8a6',
    githubUrl: 'https://github.com/sagar0kaushik/Student-Management-System',
    liveUrl: 'https://github.com/sagar0kaushik/Student-Management-System',
    featured: true,
    metrics: [
      { label: 'Validation', value: 'Pydantic Schemas' },
      { label: 'CRUD Latency', value: '<25ms' },
      { label: 'UI Interface', value: 'React Dashboard' },
    ],
  },
  {
    id: 'yt-video-downloader',
    number: '06',
    name: 'YouTube Media Engine (yt-video)',
    category: 'MEDIA STREAM PROCESSING',
    subtitle: 'High-throughput format extraction and stream pipe engine',
    description:
      'Full-stack media utility application engineered with Node.js and Express to extract video formats, process chunked streaming pipelines, and deliver direct media downloads.',
    detailedProblem:
      'Buffering entire video files into server RAM leads to instant memory exhaustion under concurrent client download requests.',
    detailedSolution:
      'Implemented HTTP chunked streaming pipes that bridge source media streams directly to client response buffers without intermediate disk writes.',
    technologies: ['Node.js', 'Express.js', 'Stream Pipelines', 'REST APIs', 'Render'],
    visual: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
    accentColor: '#ef4444',
    githubUrl: 'https://github.com/sagar0kaushik/yt-video',
    liveUrl: 'https://github.com/sagar0kaushik/yt-video',
    featured: false,
    metrics: [
      { label: 'Stream Type', value: 'Zero-RAM Pipe' },
      { label: 'Format Support', value: 'Multi-Res' },
      { label: 'Deployment', value: 'Render Cloud' },
    ],
  },
  {
    id: 'weather-app',
    number: '07',
    name: 'Real-Time Weather Web App',
    category: 'METEOROLOGICAL PLATFORM',
    subtitle: 'Live atmospheric intelligence with geolocational updates',
    description:
      'Real-time weather application consuming the OpenWeatherMap API with asynchronous JavaScript, debounced queries, dynamic DOM rendering, and responsive visuals.',
    detailedProblem:
      'Public weather apps are frequently weighed down with ads and third-party trackers, generating layout shifts and sluggish mobile rendering.',
    detailedSolution:
      'Constructed a pure, tracker-free client with asynchronous fetch pipelines, city debounce search, and dynamic visual styling based on real-time atmospheric conditions.',
    technologies: ['JavaScript (ES6+)', 'OpenWeatherMap API', 'Async/Await', 'CSS3', 'Vercel'],
    visual: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&q=80',
    accentColor: '#38bdf8',
    githubUrl: 'https://github.com/sagar0kaushik/weather-web-app',
    liveUrl: 'https://sagar0kaushik-weather-web-app.vercel.app/',
    featured: false,
    metrics: [
      { label: 'API Response', value: 'Real-Time' },
      { label: 'Search', value: 'Debounced' },
      { label: 'Deployment', value: 'Vercel Edge' },
    ],
  },
];
