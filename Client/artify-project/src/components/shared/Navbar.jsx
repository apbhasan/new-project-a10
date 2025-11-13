// src/components/shared/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// local user icon (src/assets/user-icon.webp)
import userIcon from "../../assets/user-icon.webp";

const Navbar = () => {
  const { user, logOut, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  // fallback user image: if photoURL is missing/invalid, use local user icon
  const userPhoto =
    user?.photoURL &&
    user.photoURL !== "null" &&
    user.photoURL !== "" &&
    !user.photoURL.startsWith("null")
      ? user.photoURL
      : userIcon;

  const navLinks = (
    <>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `nav-link${isActive ? " nav-link-active" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `nav-link${isActive ? " nav-link-active" : ""}`
        }
      >
        Explore Artworks
      </NavLink>

      <NavLink
        to="/add-artwork"
        className={({ isActive }) =>
          `nav-link${isActive ? " nav-link-active" : ""}`
        }
      >
        Add Artwork
      </NavLink>

      <NavLink
        to="/my-gallery"
        className={({ isActive }) =>
          `nav-link${isActive ? " nav-link-active" : ""}`
        }
      >
        My Gallery
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `nav-link${isActive ? " nav-link-active" : ""}`
        }
      >
        My Favorites
      </NavLink>
    </>
  );

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="logo">
          <span className="logo-mark">A</span>rtify
        </Link>

        <nav className="nav-links">{navLinks}</nav>

        <div className="nav-right">
          <button
            className="btn-outline theme-toggle"
            onClick={toggleTheme}
            data-tooltip-id="theme-tip"
            data-tooltip-content={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
          <Tooltip id="theme-tip" place="bottom" />

          {!user && (
            <>
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="user-menu">
              <img src={userPhoto} alt="user" className="user-avatar" />
              <div className="user-dropdown">
                <p>{user.displayName || "Artist"}</p>
                <button onClick={handleLogout} className="btn-outline full">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
