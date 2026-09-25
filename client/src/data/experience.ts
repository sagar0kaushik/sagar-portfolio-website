export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  type: 'WORK' | 'EDUCATION' | 'LEADERSHIP';
  description: string;
  achievements: string[];
  technologies: string[];
  featured?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'uddharana-tech',
    year: '2024 — 2025',
    role: 'Software Engineer Intern (Full-Stack & Cloud)',
    company: 'Uddharana Tech Private Limited',
    location: 'Faridabad, India',
    type: 'WORK',
    description:
      'Engineered scalable full-stack web applications, resilient backend microservices, and reactive user interfaces with end-to-end cloud deployment pipelines.',
    achievements: [
      'Developed responsive, high-performance web interfaces using React.js, Tailwind CSS, and HTML5/CSS3.',
      'Constructed modular REST APIs in Node.js/Express and Python/FastAPI for user workflows, product catalogs, and transaction handling.',
      'Implemented secure JWT authentication and token-based route guards ensuring zero-trust session integrity.',
      'Designed and indexed MongoDB document schemas to accelerate high-frequency queries and optimize database throughput.',
      'Collaborated on cloud deployment setups and API testing collections using Postman and Git branch reviews.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'MongoDB', 'JWT', 'Tailwind CSS', 'Postman'],
    featured: true,
  },
  {
    id: 'programming-club',
    year: '2023 — 2025',
    role: 'Coordinator & Technical Lead',
    company: 'Programming Club, GEC Bharatpur',
    location: 'Bharatpur, India',
    type: 'LEADERSHIP',
    description:
      'Led technical initiatives, organized hands-on coding bootcamps, and mentored aspiring engineers across algorithmic problem solving and web systems.',
    achievements: [
      'Organized coding workshops, hackathons, and technical lectures attended by 50+ engineering students.',
      'Mentored peers in Data Structures & Algorithms, modern JavaScript, and Git collaboration workflows.',
      'Authored starter project repositories and curated learning paths for full-stack web development.',
    ],
    technologies: ['Data Structures & Algorithms', 'JavaScript', 'Git & GitHub', 'System Design Basics'],
    featured: true,
  },
  {
    id: 'gec-bharatpur',
    year: '2022 — 2026',
    role: 'B.Tech in Computer Science and Engineering',
    company: 'Government Engineering College Bharatpur',
    location: 'Bharatpur, Rajasthan, India',
    type: 'EDUCATION',
    description:
      'Rigorous engineering degree emphasizing core computer science fundamentals, distributed systems, database internals, and modern application architecture.',
    achievements: [
      'Cumulative Grade Point Average (CGPA): 7.8 (8th Semester).',
      'Relevant Coursework: Database Management Systems (DBMS), Cloud Computing, Computer Networks, Operating Systems, OOP.',
      'Active contributor to departmental open-source projects and campus tech symposiums.',
    ],
    technologies: ['C/C++', 'DBMS', 'Operating Systems', 'Computer Networks', 'Cloud Architectures'],
    featured: true,
  },
];
