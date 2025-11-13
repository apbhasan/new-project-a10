// src/components/AddArtwork/AddArtwork.jsx
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext"; // only import ONCE

const AddArtwork = () => {
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newArt = {
      imageURL: form.imageURL.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
      artistName: user?.displayName || "Unknown artist",
      artistPhoto: user?.photoURL,
      userEmail: user?.email,
      likes: 0,
    };

    axios
      .post("http://localhost:5000/artworks", newArt)
      .then(() => {
        toast.success("Artwork added successfully!");
        form.reset();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section className="section">
      <div className="container narrow">
        <div className="section-header">
          <h2>Add New Artwork</h2>
          <p>Share your creation with the community.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Image URL</label>
            <input name="imageURL" type="url" required />
          </div>

          <div className="form-row">
            <label>Title</label>
            <input name="title" required />
          </div>

          <div className="form-row">
            <label>Category</label>
            <input name="category" placeholder="Painting, Digital, Sketch..." required />
          </div>

          <div className="form-row">
            <label>Medium / Tools</label>
            <input name="medium" placeholder="Oil, Procreate, Blender..." required />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea name="description" rows="3" required />
          </div>

          <div className="form-row">
            <label>Dimensions (optional)</label>
            <input name="dimensions" />
          </div>

          <div className="form-row">
            <label>Price (optional)</label>
            <input name="price" type="number" step="0.01" />
          </div>

          <div className="form-row">
            <label>Visibility</label>
            <select name="visibility" defaultValue="Public">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="form-row grid-2">
            <div>
              <label>User Name</label>
              <input value={user?.displayName || ""} readOnly />
            </div>
            <div>
              <label>User Email</label>
              <input value={user?.email || ""} readOnly />
            </div>
          </div>

          <button className="btn-primary full" type="submit">
            Add Artwork
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddArtwork;
