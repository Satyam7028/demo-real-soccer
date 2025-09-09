import { toast } from "react-toastify";
import { updateProfile } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/toast";

export default function ProfilePage() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(res.data);
        setName(res.data.name);
      } catch (err) {
        toast.error("❌ Failed to fetch profile");
      }
    };

    if (user?.token) fetchProfile();
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password && password.length < 6) {
      toast.error("❌ Password must be at least 6 characters");
      return;
    }

    dispatch(updateProfile({ name, password }))
      .unwrap()
      .then(() => {
        notifySuccess("✅ Profile updated successfully!");
        setPassword("");
      })
      .catch(() => notifyError("❌ Update failed. Try again."));
  };

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="border p-2 w-full mb-4 bg-gray-100"
        />

        <label className="block mb-2 font-medium">New Password</label>
        <input
          type="password"
          value={password}
          placeholder="Leave blank to keep current password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded px-4 py-2 text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
