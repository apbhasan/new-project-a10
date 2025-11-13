// components/shared/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3 className="footer-logo">Artify</h3>
          <p className="footer-text">
            A creative hub for artists and art lovers around the world.
          </p>
          <div className="socials">
            <a href="#" aria-label="X">
              {/* new X logo via unicode or simple X */}
              ✕
            </a>
            <a href="#" aria-label="Instagram">
              ⧖
            </a>
            <a href="#" aria-label="Behance">
              Bē
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/explore">Artworks</Link>
            <Link to="/my-gallery">My Gallery</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Stay up to date</h4>
            <form className="footer-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit" className="btn-primary">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} Artify. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
