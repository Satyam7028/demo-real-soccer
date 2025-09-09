import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeague } from "./leagueSlice";
import { useParams } from "react-router-dom";

export default function LeagueDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.leagues);

  useEffect(() => {
    dispatch(fetchLeague(id));
  }, [dispatch, id]);

  if (loading || !selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
      <p className="text-gray-600 mb-2">Country: {selected.country}</p>
      <p className="text-gray-600 mb-2">Season: {selected.season}</p>
      <p className="text-gray-600 mb-2">Teams: {selected.teams?.join(", ")}</p>
      <p className="text-gray-600 mb-2">Standings: {JSON.stringify(selected.standings)}</p>
    </div>
  );
}
