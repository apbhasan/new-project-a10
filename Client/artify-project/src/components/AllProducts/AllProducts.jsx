// src/components/AllProducts/AllProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchArtworks = () => {
    setLoading(true);

    axios
      .get("http://localhost:3000/artworks", {
        params: {
          visibility: "Public",
          search: search || undefined,
          category: category || undefined,
        },
      })
      .then((res) => {
        setArtworks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArtworks();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    // refetch when category changes (but not on every keystroke)
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Explore Artworks</h2>
          <p>Discover public artworks shared by the Artify community.</p>
        </div>

        {/* Search + Filter */}
        <div className="explore-controls">
          <form onSubmit={handleSearch} className="explore-search">
            <input
              type="text"
              placeholder="Search by title or artist"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn-outline">
              Search
            </button>
          </form>

          <div className="explore-filter">
            <label>Category</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value="All">All</option>
              <option value="Painting">Painting</option>
              <option value="Digital">Digital</option>
              <option value="Photography">Photography</option>
              <option value="Sketch">Sketch</option>
              <option value="3D">3D</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        {artworks.length === 0 ? (
          <p className="muted">No artworks found.</p>
        ) : (
          <div className="grid grid-3">
            {artworks.map((art) => (
              <div className="card artwork-card" key={art._id}>
                <img src={art.imageURL} alt={art.title} className="card-img" />
                <div className="card-body">
                  <h3>{art.title}</h3>
                  <p className="muted">
                    {art.artistName} • {art.category}
                  </p>
                  <p className="muted">❤️ {art.likes || 0} likes</p>
                  <Link
                    to={`/artworks/${art._id}`}
                    className="btn-outline full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
