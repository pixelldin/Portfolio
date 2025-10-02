export default function HomePage() {
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
