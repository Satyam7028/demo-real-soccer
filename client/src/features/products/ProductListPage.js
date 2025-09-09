import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {Array.isArray(items) ? (
        items.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover mb-3"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-3">No products available.</p>
      )}
    </div>
  );
}
