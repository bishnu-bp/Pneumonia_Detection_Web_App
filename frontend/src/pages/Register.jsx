import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.username || !form.password || !form.passwordConfirm) {
      toast.error("All fields are required.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 15) {
      toast.error("Password must be between 8 and 15 characters.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
        password_confirm: form.passwordConfirm
      });

      toast.success("Registration successful! Redirecting to login...");
      
      // Clear form
      setForm({ username: "", email: "", password: "", passwordConfirm: "" });

      // Redirect after a short delay to show toast
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const messages = Object.entries(errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        toast.error(messages);
      } else {
        toast.error("Something went wrong. Try again!");
      }
    }
  };

  return (
    <div className="register-section">
    <div className="container">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email "
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.passwordConfirm}
          required
          onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      
        Already have an account?{" "}
        <span className="login-link" onClick={() => navigate("/")}>
          Login here
        </span>
      

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </div>
    </div>
  );
}
