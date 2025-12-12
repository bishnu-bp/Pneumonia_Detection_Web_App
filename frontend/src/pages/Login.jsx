import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Username and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/login/", form);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("username", form.username); // store username

      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        if (data) {
          if (data.non_field_errors) {
            const nonFieldMsgs = Array.isArray(data.non_field_errors)
              ? data.non_field_errors
              : [data.non_field_errors];
            toast.error(nonFieldMsgs.join(" "));
          } else {
            const messages = Object.entries(data)
              .map(([field, msgs]) => {
                const msgArray = Array.isArray(msgs) ? msgs : [msgs];
                return `${field}: ${msgArray.join(", ")}`;
              })
              .join(" | ");
            toast.error(messages);
          }
        } else {
          toast.error("Login failed! Please check your credentials.");
        }
      } else if (error.request) {
        toast.error("No response from server. Check your network.");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="container">
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <p className="mt-3">
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
    </div>
  );
}
