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
          <span className="contact-label">Email:</span> Dineshdi.cc@gmail.com
        </p>
        <p className="body-text">
          <span className="contact-label">GitHub:</span>{" "}
          <a href="https://github.com/pixelldin" target="_blank" rel="noopener noreferrer" className="text-link">
            @dinesh
          </a>
        </p>
        <p className="body-text">
          <span className="contact-label">LinkedIn:</span>{" "}
          <a href="https://www.linkedin.com/in/dinesh-p-51573b259/" target="_blank" rel="noopener noreferrer" className="text-link">
            /in/dinesh
          </a>
        </p>
      </div>

      <div className="highlight-section">
        <p className="body-text">
          Feel free to reach out via email or connect with me on any of the platforms above!
        </p>
      </div>
    </div>
  );
}
