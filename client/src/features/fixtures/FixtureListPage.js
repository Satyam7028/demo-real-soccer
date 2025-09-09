import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFixtures } from "./fixtureSlice";
import { Link } from "react-router-dom";

export default function FixtureListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.fixtures);

  useEffect(() => {
    dispatch(fetchFixtures());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading fixtures...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Array.isArray(items) ? (
        items.map((fixture) => (
          <Link
            key={fixture._id}
            to={`/fixtures/${fixture._id}`}
            className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
          >
            <h3 className="font-bold">{fixture.homeTeam} vs {fixture.awayTeam}</h3>
            <p className="text-gray-600">{fixture.league}</p>
            <p className="text-gray-600">{new Date(fixture.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Status: {fixture.status}</p>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-3">No fixtures available.</p>
      )}
    </div>
  );
}
