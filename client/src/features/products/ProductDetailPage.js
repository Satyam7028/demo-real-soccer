import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../cart/cartSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

    <button
        onClick={() =>
            dispatch(
            addToCart({
             _id: selected._id,
              name: selected.name,
               price: selected.price,
               image: selected.image,
               qty: 1,
            })
            )
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
    >
    Add to Cart
    </button>
  const { selected, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading || !selected) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <img src={selected.image} alt={selected.name} className="w-full h-60 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
      <p className="text-gray-600 mb-2">{selected.description}</p>
      <p className="text-lg font-semibold mb-4">₹{selected.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
}
