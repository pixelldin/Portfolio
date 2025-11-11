export default function ResumePage() {
  return (
    <div className="section">
      <h2 className="section-heading">Resume</h2>

      <p className="body-text">
        You can download my latest resume below!.
      </p>

      <a
        href="/Dinesh-Resume.pdf" // ✅ correct path (file must be in public/)
        download="Dinesh_Resume.pdf"
        className="text-link"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          fontWeight: "bold",
        }}
      >
        Download Resume →
      </a>

      <h3
        className="section-subheading"
        style={{ marginTop: "2rem", fontWeight: "600" }}
      >
      </h3>

      <ul className="body-text">
      </ul>
    </div>
  );
}
