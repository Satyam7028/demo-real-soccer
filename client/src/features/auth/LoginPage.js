import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        notifySuccess("✅ Logged in successfully!");
        navigate("/");
      })
      .catch(() => {
        notifyError("❌ Login failed. Check your credentials.");
      });
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
