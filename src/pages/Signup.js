import React, { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await signupUser(form);

      // Store tokens from auto-login after signup
      localStorage.setItem("token", res.data.tokens.access);
      localStorage.setItem("refreshToken", res.data.tokens.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup successful! Welcome to Task Manager! 🎉");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Signup failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success">Create Account</h2>
            <p className="text-muted">Join us today and start managing your tasks!</p>
          </div>

          {errors.general && (
            <div className="alert alert-danger" role="alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  👤
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : 'border-success'}`}
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              {errors.username && (
                <div className="invalid-feedback d-block">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  📧
                </span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : 'border-success'}`}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              {errors.email && (
                <div className="invalid-feedback d-block">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  🔒
                </span>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : 'border-success'}`}
                  placeholder="Create a password (min 6 characters)"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength="6"
                />
              </div>
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-success text-decoration-none fw-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;