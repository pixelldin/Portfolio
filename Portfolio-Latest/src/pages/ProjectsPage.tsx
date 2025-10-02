export default function ProjectsPage() {
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
