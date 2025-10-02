import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-title">Reagan Hsu</h1>
        <p className="portfolio-date">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
      </header>

      <nav className="portfolio-nav">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          projects
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          blog
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          archive
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          contact
        </NavLink>
      </nav>

      <main className="portfolio-content">
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/archive" element={<PastPortfoliosSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </main>
    </div>
  );
}

function HomeSection() {
  return (
    <div className="section">
      <p className="intro-text">
        Computer Science student at UC San Diego. Building products at the intersection of AI and human-computer interaction.
      </p>

      <p className="body-text">
        I work on intelligent systems that make technology more accessible and intuitive.
        From web accessibility tools to AI agents, I'm focused on creating experiences that adapt to people's needs.
      </p>

      <p className="body-text">
        My background spans frontend development, machine learning research, and product engineering.
        I believe the best interfaces disappear into the workflow.
      </p>

      <div className="highlight-section">
        <h2 className="section-heading">Currently</h2>
        <p className="body-text">
          Growth Engineer at Browser Use (YC W25), shipping daily as part of a 100 products in 100 days initiative.
          Claude Campus Ambassador at Anthropic. Projects Director at ACM UCSD.
        </p>
      </div>

      <div className="link-section">
        <a href="https://github.com/Cheggin" target="_blank" rel="noopener noreferrer" className="text-link">
          github
        </a>
        <span className="link-separator">·</span>
        <a href="https://linkedin.com/in/reaganhsu" target="_blank" rel="noopener noreferrer" className="text-link">
          linkedin
        </a>
        <span className="link-separator">·</span>
        <a href="https://reaganhsu.com" target="_blank" rel="noopener noreferrer" className="text-link">
          website
        </a>
        <span className="link-separator">·</span>
        <a href="mailto:reaganhsu123@gmail.com" className="text-link">
          email
        </a>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "BetterWeb",
      award: "1st Place Overall @ Dedalus Labs (YC S25) x YC Agents Hackathon",
      description: "A web extension that rewrites websites for improved accessibility and customization in real time. Analyzes HTML, CSS, screenshots, and Browser Use agent data to detect and fix accessibility failures affecting 95%+ of top 1M websites.",
      tech: "Browser Use, Convex, HTML Parsing",
      link: "https://github.com/Cheggin"
    },
    {
      name: "FinHog",
      award: "2nd Place Best Financial Visualization Agent @ HackMIT",
      description: "An agent-driven analytics platform that automatically generates and adapts visualizations for transaction data.",
      tech: "Claude, React, Agent Architecture",
      link: "https://github.com/Cheggin"
    },
    {
      name: "CiteTrace",
      award: "1st Place Overall @ Intel x ACM SCU Hackathon",
      description: "An app that relationally consolidates research to allow for smooth visualizations of research articles.",
      tech: "d3-force, Supabase, Expo, Flask, Hugging Face",
      link: "https://github.com/Cheggin"
    },
    {
      name: "SFGovTV++",
      award: "3rd Place @ SF10X Hackathon",
      description: "A website that makes civic engagement in SF as easy as a Google search instead of inaccessible, lengthy videos.",
      tech: "FastAPI, pgvector, React, LangChain, PostgreSQL",
      link: "https://github.com/Cheggin"
    }
  ];

  return (
    <div className="section">
      <h2 className="section-heading">Selected Work</h2>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3 className="project-name">{project.name}</h3>
            {project.award && <p className="project-tech">{project.award}</p>}
            <p className="body-text">{project.description}</p>
            <p className="project-tech">{project.tech}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-link">
              view project →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="section">
      <h2 className="section-heading">Get in touch</h2>

      <p className="body-text">
        I'm always interested in hearing about new opportunities, collaborations, or just chatting
        about technology.
      </p>

      <div className="contact-info">
        <p className="body-text">
          <span className="contact-label">Email:</span> reaganhsu123@gmail.com
        </p>
        <p className="body-text">
          <span className="contact-label">GitHub:</span>{" "}
          <a href="https://github.com/Cheggin" target="_blank" rel="noopener noreferrer" className="text-link">
            @Cheggin
          </a>
        </p>
        <p className="body-text">
          <span className="contact-label">LinkedIn:</span>{" "}
          <a href="https://linkedin.com/in/reaganhsu" target="_blank" rel="noopener noreferrer" className="text-link">
            /in/reaganhsu
          </a>
        </p>
        <p className="body-text">
          <span className="contact-label">Website:</span>{" "}
          <a href="https://reaganhsu.com" target="_blank" rel="noopener noreferrer" className="text-link">
            reaganhsu.com
          </a>
        </p>
      </div>

      <div className="highlight-section">
        <p className="body-text">
          Feel free to reach out via email or connect with me on any of the platforms above.
        </p>
      </div>
    </div>
  );
}

function BlogSection() {
  return (
    <div className="section">
      <h2 className="section-heading">Writing</h2>

      <p className="body-text">
        Coming soon. Thoughts on AI, software engineering, and building products.
      </p>
    </div>
  );
}

function PastPortfoliosSection() {
  const portfolios = [
    {
      version: "V1",
      name: "Liquid Glass Portfolio",
      date: "2024",
      description: "Interactive portfolio with fluid cursor effects, glassmorphism UI, and advanced animations using React, Three.js, and WebGL.",
      tech: "React, TypeScript, Three.js, GSAP, Framer Motion, Supabase",
      link: "/v1/index.html"
    }
  ];

  return (
    <div className="section">
      <h2 className="section-heading">Past Portfolios</h2>

      <p className="body-text">
        A collection of previous portfolio iterations, showcasing different design approaches and technologies.
      </p>

      <div className="projects-list">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="project-item">
            <h3 className="project-name">{portfolio.name}</h3>
            <p className="project-tech">{portfolio.version} · {portfolio.date}</p>
            <p className="body-text">{portfolio.description}</p>
            <p className="project-tech">{portfolio.tech}</p>
            <a href={portfolio.link} target="_blank" rel="noopener noreferrer" className="text-link">
              view portfolio →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
