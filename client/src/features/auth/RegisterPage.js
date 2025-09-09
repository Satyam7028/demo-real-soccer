import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        notifySuccess("✅ Registered successfully!");
        navigate("/");
    })
     .catch(() => notifyError("❌ Registration failed"));
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 font-bold">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
