import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <Link to="/" className="font-bold text-xl">⚽ Real Soccer</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart" className="ml-4">
              🛒 Cart ({items.length})
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
