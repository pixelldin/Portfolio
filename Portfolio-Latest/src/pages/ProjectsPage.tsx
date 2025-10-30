export default function ProjectsPage() {
  const projects = [
    {
      name: "CI/CD Pipeline with Jenkins and Docker",
      award: "A complete end-to-end CI/CD pipeline project",
      date: "Sep. 2025",
      description: "Where source code is pushed to GitHub, automatically built by Jenkins using Maven, and deployed to a Tomcat server. The setup extends to containerization the generated .war file is packaged into a Docker image and deployed on a Docker container for scalable delivery.",
      tech: "Terraform, GitHub, Jenkins, Maven, Tomcat, Docker, AWS EC2",
      link: "https://github.com/pixelldin/CI-CD-Project/"
    },
    {
      name: "Job Use",
      award: "3rd Place + 2nd Place SonicJobs Prize @ AGI House Web Agent Build Day",
      date: "Sep. 2025",
      description: "A job application agent that fills out any job application form in real time with automated form filling, profile creation, and company research.",
      tech: "Browser Use, Convex, React, TypeScript, Vite",
      link: "https://github.com/Cheggin/Job-Use"
    },
    {
      name: "FinHog",
      award: "1st Place Best Use of Anthropic + 2nd Place Best Financial Visualization Agent @ HackMIT",
      date: "Sep. 2025",
      description: "An agent-driven analytics platform that automatically generates and adapts visualizations for financial transaction data in real-time.",
      tech: "Anthropic Claude, PostgreSQL, React Native, Tailwind CSS",
      link: "https://github.com/Cheggin/HACKMit2025"
    },
    {
      name: "CiteTrace",
      award: "1st Place Overall @ Intel x ACM SCU Hackathon",
      date: "May 2025",
      description: "An app that visually maps how research ideas, methods, and concepts relate across academic papers for easier comprehension.",
      tech: "Hugging Face, Intel Tiber, Supabase, React Native, RAG",
      link: "https://github.com/ShawnPana/citetrace"
    },
    {
      name: "SFGovTV++",
      award: "3rd Place Overall @ SF10X Hackathon",
      date: "Aug. 2025",
      description: "Makes civic engagement accessible through keyword search of 5TB of SF government video data with RAG chatbot assistance.",
      tech: "pgvector, React Native, Supabase, FastAPI",
      link: "https://devpost.com/software/your-city-hall-digest-san-francisco"
    }, 
    {
        name: "CARP",
        award: "3rd Place Overall @ SushiHacks 2025",
        date: "Oct. 2025",
        description: "CARP is an all-in-one app for fishermen, processing >15k fish data points to optimize fishing location while providing a wrist brace to detect carpal tunnel syndrome early.",
        tech: "Browser Use, React Native, FastAPI, Arduino",
        link: "https://github.com/Cheggin/sushihacks2025/tree/main"
    }
  ];

  return (
    <div className="section">
      <h2 className="section-heading">Selected Work</h2>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3 className="project-name">{project.name}</h3>
            {project.award && <p className="project-tech">{project.award} · {project.date}</p>}
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
