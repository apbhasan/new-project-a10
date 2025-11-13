// Login.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section className="section">
      <div className="container narrow">
        <div className="section-header">
          <h2>Login</h2>
          <p>Welcome back to Artify.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input name="password" type="password" required />
          </div>
          <button className="btn-primary full" type="submit">
            Login
          </button>
        </form>

        <button className="btn-outline full" onClick={handleGoogle}>
          Continue with Google
        </button>

        <p className="form-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
