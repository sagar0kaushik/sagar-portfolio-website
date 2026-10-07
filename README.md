# Sagar Kaushik — Futuristic 3D Creative Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**A high-performance, dark creative-tech developer portfolio engineered with real-time 3D character interaction, 360° conjugate eye tracking, custom magnetic glass cursor, and stacked 3D perspective flip cards.**

[Explore GitHub Repository](https://github.com/sagar0kaushik/sagar-portfolio-website) • [Live Portfolio](https://github.com/sagar0kaushik/sagar-portfolio-website)

</div>

---

## ✦ Key Highlights & Interactive Features

### 1. 3D Character Bust with 360° Conjugate Eye Tracking
- **Zero-Wobble Stability**: The character torso, hair curls, and hoodie remain 100% stable from top to bottom.
- **Natural Eye Tracking**: High-frequency binocular eye tracking with exponential smoothing (60–144 FPS) dynamically gazes toward your cursor in real time across the entire viewport.
- **Auto-Centering**: Gaze smoothly returns to neutral eye position whenever the cursor leaves the window.
- **Sleek Grayish-White Studio Backlight**: Photographic studio backlight and rim lighting tuned to clean silver and grayish-white tones against the `#000000` deep black backdrop.

### 2. Glassmorphic Custom Cursor & Badge Follower
- **Dot-Free Minimal Ring**: Clean, floating glass circle with smooth trailing physics.
- **Contextual Text Badge**: Expands seamlessly into an interactive badge (`"VIEW"`, `"OPEN"`, `"SEND"`) when hovering interactive elements and links.
- **Automatic Coarse Pointer Detection**: Gracefully deactivates on touch screens (iOS/Android) for native ergonomics.

### 3. 3D Project Showcase Deck
- **Sticky Card Deck Stacking**: As you scroll through the projects section, each project card stacks cleanly with dynamic vertical offsets.
- **3D Perspective Flip-In Entry**: Cards emerge into view with dynamic 3D rotation (`rotateX`), depth perspective, and smooth opacity transitions.
- **Rich Project Metadata**: Displays live metrics, role, tech stack chips, problem/solution breakdown, and direct GitHub/Live links.

### 4. Fully Responsive Floating Navbar & Mobile Menu
- **Adaptive Floating Pill**: Emerges into the center of the viewport upon scrolling, maintaining perfect proportions across mobile (390px), tablet, and desktop viewports.
- **Backdrop Blur Mobile Drawer**: Dark glassmorphic mobile navigation overlay with zero horizontal overflow or sliding.

---

## ✦ Architecture & Technology Stack

```
sagar-portfolio-website/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/
│   │   └── assets/character/   # High-resolution 3D character layers & irises
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx        # Hero section with large typography & glow
│   │   │   ├── HeroCharacter.tsx # 360° conjugate eye tracking SVG engine
│   │   │   ├── Navbar.tsx      # Floating responsive navigation pill
│   │   │   ├── CustomCursor.tsx# Glass trailing badge cursor
│   │   │   ├── Projects.tsx    # Sticky stacked project cards container
│   │   │   ├── ProjectCard.tsx # 3D perspective flip card component
│   │   │   ├── About.tsx       # Bio, experience timeline & terminal
│   │   │   ├── Skills.tsx      # Interactive categorized skills matrix
│   │   │   ├── ClientWork.tsx  # Featured client collaborations & outcomes
│   │   │   ├── Contact.tsx     # Direct message form & social connections
│   │   │   └── Background3D.tsx# Ambient 3D floating canvas background
│   │   ├── App.tsx             # Main layout orchestrator & smooth scroll
│   │   └── index.css           # Custom design tokens, typography & animations
│   └── vite.config.js          # Vite build config with API proxy
└── server/                     # Backend API (Node.js + Express)
    ├── config/                 # Database configuration & in-memory fallback
    ├── middleware/             # Rate limiting & security middleware
    ├── routes/                 # REST endpoints for projects, blogs, contact, SEO
    └── index.js                # Express entry point & static dist file server
```

### Frontend Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion 13 + GSAP + Smooth Scroll
- **3D Graphics**: Three.js / React Three Fiber
- **Icons**: Lucide React

### Backend Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Security**: Helmet, CORS, Express Rate Limiter
- **Data Layer**: MongoDB Atlas integration with in-memory persistence fallback

---

## ✦ Featured Projects

1. **AI-Powered Code Reviewer**
   - Automated intelligent pull request reviews with LLM semantic analysis, AST linting, and automated security scanning.
   - *Tech*: Python, FastAPI, Docker, OpenAI API, GitHub Webhooks.

2. **Distributed Microservices Gateway**
   - High-throughput API gateway with distributed token-bucket rate limiting, circuit breaker pattern, and OpenTelemetry distributed tracing.
   - *Tech*: Go, Redis, Docker, Prometheus, Grafana.

3. **Cloud Native E-Commerce Platform**
   - Event-driven microservices architecture handling inventory, payments, and notifications with sub-50ms latency.
   - *Tech*: MERN Stack, Kafka, Docker, Kubernetes, AWS.

---

## ✦ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/sagar0kaushik/sagar-portfolio-website.git
cd sagar-portfolio-website
```

### 2. Install Dependencies
```bash
# Install root, client, and server dependencies
npm run install:all
```
*Or install client separately:*
```bash
cd client
npm install
```

### 3. Run the Development Server
```bash
# Start the client with Vite (Runs on http://127.0.0.1:5173/)
cd client
npm run dev
```

To run both backend API and frontend concurrently:
```bash
# Terminal 1: Backend API (http://localhost:5000)
npm run server:dev

# Terminal 2: Frontend UI (http://localhost:5173)
npm run client
```

### 4. Build for Production
```bash
cd client
npm run build
```
The optimized production bundle will be generated in `client/dist`.

---

## ✦ Deployment

### GitHub Repository
- **Repository URL**: [https://github.com/sagar0kaushik/sagar-portfolio-website](https://github.com/sagar0kaushik/sagar-portfolio-website)

### Vercel / Netlify (Client Only)
1. Import the repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.

### Render / Railway (Full Stack)
1. Connect repository on [Render](https://render.com) as a **Web Service**.
2. Set **Build Command**: `npm run build:all`
3. Set **Start Command**: `node server/index.js`

---

## ✦ Author & Connect

**SAGAR KAUSHIK**  
*Full-Stack Developer & Software Engineer*

- 🌐 **GitHub**: [@sagar0kaushik](https://github.com/sagar0kaushik)
- 💼 **LinkedIn**: [linkedin.com/in/sagar0kaushik](https://linkedin.com/in/sagar0kaushik)
- 🐦 **Twitter / X**: [@sagar0kaushik](https://twitter.com/sagar0kaushik)

---

<div align="center">
  <sub>Designed & Developed with precision by Sagar Kaushik. Built with React 19, Three.js, Tailwind CSS & Framer Motion.</sub>
</div>
