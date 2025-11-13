// src/components/ArtworkDetails/ArtworkDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistCount, setArtistCount] = useState(0);

  const fetchArtwork = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/artworks/${id}`)
      .then((res) => {
        setArt(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load artwork");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArtwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // fetch total artworks by this artist (for assignment requirement)
  useEffect(() => {
    if (!art?.userEmail) return;

    axios
      .get("http://localhost:3000/artworks", {
        params: { email: art.userEmail },
      })
      .then((res) => setArtistCount(res.data.length))
      .catch((err) => console.error(err));
  }, [art?.userEmail]);

  const handleLike = () => {
    axios
      .patch(`http://localhost:3000/artworks/${id}/like`)
      .then(() => {
        toast.success("You liked this artwork");
        fetchArtwork(); // refresh likes
      })
      .catch((err) => toast.error(err.message));
  };

  const handleFavorite = () => {
    if (!user?.email) {
      toast.error("You must be logged in to add favorites");
      return;
    }

    const favorite = {
      artworkId: art._id,
      userEmail: user.email,
      artworkSnapshot: art,
    };

    axios
      .post("http://localhost:3000/favorites", favorite)
      .then(() => toast.success("Added to favorites"))
      .catch((err) => toast.error(err.message));
  };

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="center-page">
        <p>Artwork not found.</p>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container narrow">
        <div className="art-details">
          <div className="art-details-image">
            <img src={art.imageURL} alt={art.title} />
          </div>

          <div className="art-details-info">
            <h2>{art.title}</h2>
            <p className="muted">
              {art.category} • {art.medium}
            </p>

            <p className="art-description">{art.description}</p>

            <div className="art-meta">
              {art.dimensions && (
                <p>
                  <strong>Dimensions:</strong> {art.dimensions}
                </p>
              )}
              {art.price && (
                <p>
                  <strong>Price:</strong> ${art.price}
                </p>
              )}
              <p>
                <strong>Visibility:</strong> {art.visibility}
              </p>
              <p>
                <strong>Likes:</strong> {art.likes || 0}
              </p>
            </div>

            <div className="art-actions">
              <button className="btn-primary" onClick={handleLike}>
                👍 Like
              </button>
              <button className="btn-outline" onClick={handleFavorite}>
                ❤️ Add to Favorites
              </button>
            </div>

            <div className="artist-card">
              <div className="artist-info">
                <img
                  src={art.artistPhoto || "https://i.ibb.co/7nL9gKz/user.png"}
                  alt={art.artistName}
                  className="artist-avatar"
                />
                <div>
                  <p className="artist-name">
                    {art.artistName || "Unknown Artist"}
                  </p>
                  <p className="muted">Total artworks: {artistCount}</p>
                </div>
              </div>
              <p className="muted">
                This artist shares their creative journey on Artify. Explore
                more from them in Explore or My Gallery (if it&apos;s you).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtworkDetails;
