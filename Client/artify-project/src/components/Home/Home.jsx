// src/components/Home/Home.jsx
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load 6 most recent public artworks for Featured section
  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-artworks")
      .then((res) => {
        setFeatured(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      {/* ======================
          HERO SECTION (TYPEWRITER)
      ====================== */}
      <section className="hero">
        <div className="container hero-inner">
          {/* LEFT TEXT */}
          <div className="hero-text">
            <h1 className="hero-title">
              Showcase Your{" "}
              <span className="accent">
                <Typewriter
                  words={[
                    "Original Artworks",
                    "Digital Paintings",
                    "Concept Sketches",
                    "3D Creations",
                  ]}
                  loop={0} // infinite
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            <p className="hero-subtitle">
              Artify is your creative world. Share your art, explore other
              artists&apos; galleries, and build your personal favorites
              collection in a modern, clean interface.
            </p>

            <div className="hero-actions">
              <Link to="/explore" className="btn-primary">
                Explore Artworks
              </Link>
              <Link to="/add-artwork" className="btn-outline">
                Add Your Art
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL CARD */}
          <div className="hero-visual">
            <div className="hero-card">
              <p className="muted">Featured Today</p>
              <h3>
                Curated picks from painters, illustrators &amp; 3D visionaries.
              </h3>
              <p className="muted small">
                Scroll down to explore trending artworks and top artists of the
                week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          FEATURED ARTWORKS (6 most recent public)
      ====================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Artworks</h2>
            <p className="muted">
              A rotating selection of the most recent public artworks on
              Artify.
            </p>
          </div>

          {loading ? (
            <div className="center-page">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {featured.map((art) => (
                <div className="card artwork-card" key={art._id}>
                  <img
                    src={art.imageURL}
                    alt={art.title}
                    className="card-img"
                  />
                  <div className="card-body">
                    <h3>{art.title}</h3>
                    <p className="muted">
                      {art.artistName} • {art.category}
                    </p>
                    <p className="muted">❤️ {art.likes || 0} likes</p>

                    <div className="card-actions">
                      <Link
                        to={`/artworks/${art._id}`}
                        className="btn-outline full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {!featured.length && !loading && (
                <p className="muted">No artworks found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ======================
          TOP ARTISTS OF THE WEEK
      ====================== */}
      <section className="section alt">
        <div className="container">
          <div className="section-header">
            <h2>Top Artists of the Week</h2>
            <p className="muted">
              Artists who are consistently sharing and engaging with the
              community.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card artist-card">
              <div className="artist-info">
                <img
                  src="https://i.ibb.co/7nL9gKz/user.png"
                  alt="Elena Rivers"
                  className="artist-avatar"
                />
                <div>
                  <h3>Elena Rivers</h3>
                  <p className="muted">Digital Painter • 8 artworks</p>
                </div>
              </div>
              <p className="muted small">
                Known for atmospheric cityscapes and emotional lighting.
              </p>
            </div>

            <div className="card artist-card">
              <div className="artist-info">
                <img
                  src="https://i.ibb.co/7nL9gKz/user.png"
                  alt="Lucas Voss"
                  className="artist-avatar"
                />
                <div>
                  <h3>Lucas Voss</h3>
                  <p className="muted">Environment Artist • 6 artworks</p>
                </div>
              </div>
              <p className="muted small">
                Focuses on seasonal landscapes with rich texture and color.
              </p>
            </div>

            <div className="card artist-card">
              <div className="artist-info">
                <img
                  src="https://i.ibb.co/7nL9gKz/user.png"
                  alt="Nova Sterling"
                  className="artist-avatar"
                />
                <div>
                  <h3>Nova Sterling</h3>
                  <p className="muted">3D Artist • 5 artworks</p>
                </div>
              </div>
              <p className="muted small">
                Builds stylized 3D robots and sci-fi scenes with bold shapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          COMMUNITY HIGHLIGHTS
      ====================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Community Highlights</h2>
            <p className="muted">
              A glance at what the Artify community has been creating and
              appreciating recently.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <h3>Most Liked Artwork</h3>
              <p className="muted small">
                Track which pieces are receiving the most appreciation this
                week.
              </p>
            </div>

            <div className="card">
              <h3>New Artists Joined</h3>
              <p className="muted small">
                See fresh styles from new members entering the Artify community.
              </p>
            </div>

            <div className="card">
              <h3>Curated Collections</h3>
              <p className="muted small">
                Explore curated favorites and themed galleries made by users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
