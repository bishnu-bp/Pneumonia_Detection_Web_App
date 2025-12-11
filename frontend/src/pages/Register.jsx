import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!form.username || !form.password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        form
      );
      setMessage("✅ Registration successful!");
      setForm({ username: "", email: "", password: "" }); // clear form
    } catch (error) {
      if (error.response && error.response.data) {
        // Format backend validation errors
        const errors = error.response.data;
        const messages = Object.entries(errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        setMessage("❌ Error: " + messages);
      } else {
        setMessage("❌ Something went wrong. Try again!");
      }
    }
  };

  return (
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
          placeholder="Email (optional)"
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
        <button type="submit">Register</button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
