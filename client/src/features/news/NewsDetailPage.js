import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsArticle } from "./newsSlice";
import { useParams } from "react-router-dom";

export default function NewsDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsArticle(id));
  }, [dispatch, id]);

  if (loading || !selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <img src={selected.image} alt={selected.title} className="w-full h-60 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
      <p className="text-gray-600 mb-2">{selected.excerpt}</p>
      <p className="text-gray-600 mb-2">Category: {selected.category}</p>
      <p className="text-gray-600 mb-2">Author: {selected.author}</p>
      <p className="text-gray-600 mb-2">Published: {new Date(selected.publishedAt).toLocaleDateString()}</p>
      <div className="text-gray-700 mb-4">{selected.content}</div>
      <p className="text-gray-600">Tags: {selected.tags?.join(", ")}</p>
    </div>
  );
}
