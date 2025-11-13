// MyGallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyGallery = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchMyArt = () => {
    axios
      .get("http://localhost:5000/artworks", {
        params: { email: user?.email },
      })
      .then((res) => setArtworks(res.data));
  };

  useEffect(() => {
    if (user?.email) fetchMyArt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this artwork?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/artworks/${id}`)
          .then(() => {
            toast.success("Artwork deleted");
            fetchMyArt();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      visibility: form.visibility.value,
    };

    axios
      .put(`http://localhost:5000/artworks/${editing._id}`, updated)
      .then(() => {
        toast.success("Artwork updated");
        setEditing(null);
        fetchMyArt();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>My Gallery</h2>
          <p>Your uploaded artworks with options to update and delete.</p>
        </div>

        <div className="grid grid-3">
          {artworks.map((art) => (
            <div className="card artwork-card" key={art._id}>
              <img src={art.imageURL} alt={art.title} />
              <div className="card-body">
                <h3>{art.title}</h3>
                <p className="muted">
                  {art.category} • {art.visibility}
                </p>
                <div className="card-actions">
                  <button
                    className="btn-outline small"
                    onClick={() => setEditing(art)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-danger small"
                    onClick={() => handleDelete(art._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {artworks.length === 0 && (
            <p className="muted">You have not added any artworks yet.</p>
          )}
        </div>

        {/* Update modal */}
        {editing && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Edit Artwork</h3>
              <form onSubmit={handleUpdate} className="form">
                <div className="form-row">
                  <label>Title</label>
                  <input name="title" defaultValue={editing.title} required />
                </div>
                <div className="form-row">
                  <label>Category</label>
                  <input
                    name="category"
                    defaultValue={editing.category}
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Medium / Tools</label>
                  <input
                    name="medium"
                    defaultValue={editing.medium}
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editing.description}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Visibility</label>
                  <select
                    name="visibility"
                    defaultValue={editing.visibility}
                    required
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button className="btn-primary" type="submit">
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyGallery;
