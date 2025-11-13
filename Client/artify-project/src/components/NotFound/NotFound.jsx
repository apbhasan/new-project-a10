// components/NotFound/NotFound.jsx
import errorImg from "../../assets/error-404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <img src={errorImg} alt="404" className="not-found-img" />
      <h1>Oops! Artwork not found.</h1>
      <p>The page you’re looking for has been painted over.</p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
