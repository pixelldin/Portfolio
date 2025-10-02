export default function ContactPage() {
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
