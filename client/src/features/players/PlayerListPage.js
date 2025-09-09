import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "./playerSlice";
import { Link } from "react-router-dom";

export default function PlayerListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading players...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Array.isArray(items) ? (
        items.map((player) => (
          <Link
            key={player._id}
            to={`/players/${player._id}`}
            className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
          >
            <h3 className="font-bold">{player.name}</h3>
            <p className="text-gray-600">{player.position}</p>
            <p className="text-gray-600">{player.team}</p>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-3">No players available.</p>
      )}
    </div>
  );
}
