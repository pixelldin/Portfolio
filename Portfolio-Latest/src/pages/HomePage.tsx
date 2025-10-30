export default function HomePage() {
  return (
    <div className="section">
      <p className="intro-text">
        Hey, I’m Dinesh a DevOps engineer specializing in CI/CD, cloud automation, and containerized deployments.
      </p>

      <p className="body-text">
        I love building infrastructure that just works fast, stable, and effortless for developers to deploy and manage. 
      </p>

      <p className="body-text">
         My work revolves around cloud automation, CI/CD pipelines, and making production environments reliable under pressure.
      </p>

      <div className="highlight-section">
        <h2 className="section-heading">Current</h2>
        <p className="body-text">
          Right now, I’m focused on improving deployment speed, optimizing cloud costs, and strengthening monitoring through automation and container orchestration.
          <br></br>
          <br></br>
          Technical  Engineer at [GXO] helping teams automate workflows, scale efficiently on AWS, and deliver faster with zero downtime.
        </p>
      </div>

      <div className="link-section">
        <a href="https://github.com/pixelldin" target="_blank" rel="noopener noreferrer" className="text-link">
          github
        </a>
        <span className="link-separator">·</span>
        <a href="https://www.linkedin.com/in/dinesh-p-51573b259/" target="_blank" rel="noopener noreferrer" className="text-link">
          linkedin
        </a>
        <span className="link-separator">·</span>
        <a href="mailto:dineshdi.cc@gmail.com" className="text-link">
          email
        </a>
      </div>
    </div>
  );
}
