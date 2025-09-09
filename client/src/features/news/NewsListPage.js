import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./newsSlice";
import { Link } from "react-router-dom";

export default function NewsListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Array.isArray(items) ? (
        items.map((article) => (
          <Link
            key={article._id}
            to={`/news/${article._id}`}
            className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-40 w-full object-cover mb-3"
            />
            <h3 className="font-bold">{article.title}</h3>
            <p className="text-gray-600">{article.excerpt}</p>
            <p className="text-gray-600">{article.category}</p>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-3">No news available.</p>
      )}
    </div>
  );
}
