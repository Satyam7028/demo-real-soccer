import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayer } from "./playerSlice";
import { useParams } from "react-router-dom";

export default function PlayerDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayer(id));
  }, [dispatch, id]);

  if (loading || !selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
      <p className="text-gray-600 mb-2">Position: {selected.position}</p>
      <p className="text-gray-600 mb-2">Team: {selected.team}</p>
      <p className="text-gray-600 mb-2">Nationality: {selected.nationality}</p>
      <p className="text-gray-600 mb-2">Age: {selected.age}</p>
      <p className="text-gray-600 mb-2">Matches: {selected.stats?.matches}</p>
      <p className="text-gray-600 mb-2">Goals: {selected.stats?.goals}</p>
      <p className="text-gray-600 mb-2">Assists: {selected.stats?.assists}</p>
    </div>
  );
}
