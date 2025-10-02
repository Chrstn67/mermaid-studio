import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a
            href="https://mermaid.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation Mermaid
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Mermaid Studio </p>
        <img src="Logo.jpg" alt="Logo Developpeur" className="logo-image" />
      </div>
    </footer>
  );
};

export default Footer;
