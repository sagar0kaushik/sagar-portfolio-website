export interface ClientProjectItem {
  id: string;
  classification: string; // "CLIENT / FREELANCE WEB PROJECT"
  clientName: string;     // "METACLADS"
  projectType: string;    // "FREELANCE WEB DEVELOPMENT"
  liveUrl: string;        // "https://metaclads.com/"
  role: string;           // "Freelance Web Developer"
  summary: string;
  technologies: string[];
  contributions: string[];
  deliverables: string[];
  processSteps: {
    number: string;
    stage: string;
    detail: string;
  }[];
  gallery: {
    title: string;
    subtitle: string;
    image: string;
    tag: string;
  }[];
}

export const metaCladsCaseStudy: ClientProjectItem = {
  id: 'metaclads-freelance',
  classification: 'CLIENT / FREELANCE WEB PROJECT',
  clientName: 'METACLADS',
  projectType: 'FREELANCE WEB DEVELOPMENT',
  liveUrl: 'https://metaclads.com/',
  role: 'Freelance Web Developer (Frontend & Interactive Engineering)',
  summary:
    'Engineering a modern architectural digital experience for MetaClads — an innovative leader in architectural façade systems, exterior wall cladding panels, and contemporary structural surfaces. The project delivers high-fidelity visual presentation, fluid responsive behavior, and smooth web performance.',
  technologies: [
    'React / Next.js',
    'Tailwind CSS',
    'Modern CSS3',
    'Interactive Gallery Architecture',
    'Performance Optimization',
    'Responsive Design',
  ],
  contributions: [
    'Architected clean, responsive component hierarchy translating architectural specifications into high-impact digital showcase layouts.',
    'Built optimized image presentation galleries and product catalog showcases spotlighting precision exterior façade solutions.',
    'Engineered fluid cross-device layouts ensuring flawless visual hierarchy from mobile viewports to ultra-wide displays.',
    'Implemented SEO-friendly metadata, semantic document structure, and performance best practices for swift load times.',
  ],
  deliverables: [
    'Interactive Façade Systems Product Showcase',
    'Architectural Portfolio & Completed Projects Gallery',
    'Fluid Responsive Engineering Across All Viewport Breakpoints',
    'Modern Corporate Web Architecture & Fast Asset Delivery',
  ],
  processSteps: [
    {
      number: '01',
      stage: 'CLIENT',
      detail: 'Met with MetaClads stakeholders to understand brand ethos, architectural product lines, and target commercial architects.',
    },
    {
      number: '02',
      stage: 'REQUIREMENTS',
      detail: 'Defined technical requirements, responsive breakpoint targets, asset optimization criteria, and structural navigation flow.',
    },
    {
      number: '03',
      stage: 'DESIGN',
      detail: 'Established minimal, industrial-luxe aesthetics reflecting high-end architectural façades with crisp glass surfaces.',
    },
    {
      number: '04',
      stage: 'DEVELOPMENT',
      detail: 'Constructed modular frontend components, interactive image carousels, and performant product grids.',
    },
    {
      number: '05',
      stage: 'RESPONSIVE IMPLEMENTATION',
      detail: 'Fine-tuned typography clamps, grid collapses, and touch-friendly interactions across mobile, tablet, and widescreen viewports.',
    },
    {
      number: '06',
      stage: 'DEPLOYMENT',
      detail: 'Audited Core Web Vitals, minimized asset payloads, and deployed to production hosting with continuous delivery.',
    },
  ],
  gallery: [
    {
      title: 'Architectural Façade Showcase',
      subtitle: 'Modern engineered exterior cladding systems and structural aesthetics',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      tag: 'FAÇADE SYSTEMS',
    },
    {
      title: 'Structural Precision & Cladding',
      subtitle: 'Premium materials engineered for commercial and residential scale',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      tag: 'MATERIALS',
    },
    {
      title: 'Completed Commercial Projects',
      subtitle: 'Curated architectural portfolio demonstrating executed installations',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
      tag: 'PORTFOLIO',
    },
    {
      title: 'Architectural Details & Textures',
      subtitle: 'Close-up material textures, seams, and high-performance paneling',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80',
      tag: 'TEXTURES',
    },
  ],
};
