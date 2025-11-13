// src/components/Favorites/Favorites.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = () => {
    if (!user?.email) return;

    setLoading(true);

    axios
      .get("http://localhost:3000/favorites", {
        params: { email: user.email },
      })
      .then((res) => {
        setFavorites(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load favorites");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:3000/favorites/${id}`)
      .then(() => {
        toast.success("Removed from favorites");
        fetchFavorites();
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <section className="section">
        <div className="container narrow">
          <div className="section-header">
            <h2>My Favorites</h2>
            <p className="muted">You haven&apos;t added any favorites yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>My Favorites</h2>
          <p className="muted">
            These are the artworks you&apos;ve favorited across Artify.
          </p>
        </div>

        <div className="grid grid-3">
          {favorites.map((fav) => {
            const art = fav.artworkSnapshot || {};

            return (
              <div className="card artwork-card" key={fav._id}>
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
                      to={`/artworks/${fav.artworkId}`}
                      className="btn-outline"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(fav._id)}
                      className="btn-primary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
