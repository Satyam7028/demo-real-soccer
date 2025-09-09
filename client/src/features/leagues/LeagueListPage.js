import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeagues } from "./leagueSlice";
import { Link } from "react-router-dom";

export default function LeagueListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.leagues);

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading leagues...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Array.isArray(items) ? (
        items.map((league) => (
          <Link
            key={league._id}
            to={`/leagues/${league._id}`}
            className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
          >
            <h3 className="font-bold">{league.name}</h3>
            <p className="text-gray-600">{league.country}</p>
            <p className="text-gray-600">{league.season}</p>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-3">No leagues available.</p>
      )}
    </div>
  );
}
