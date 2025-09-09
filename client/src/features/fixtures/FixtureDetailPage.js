import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFixture } from "./fixtureSlice";
import { useParams } from "react-router-dom";

export default function FixtureDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.fixtures);

  useEffect(() => {
    dispatch(fetchFixture(id));
  }, [dispatch, id]);

  if (loading || !selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{selected.homeTeam} vs {selected.awayTeam}</h2>
      <p className="text-gray-600 mb-2">League: {selected.league}</p>
      <p className="text-gray-600 mb-2">Date: {new Date(selected.date).toLocaleString()}</p>
      <p className="text-gray-600 mb-2">Venue: {selected.venue}</p>
      <p className="text-gray-600 mb-2">Score: {selected.score?.home} - {selected.score?.away}</p>
      <p className="text-gray-600 mb-2">Status: {selected.status}</p>
    </div>
  );
}
