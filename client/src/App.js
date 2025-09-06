import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProfilePage from "./features/auth/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductListPage from "./features/products/ProductListPage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import CartPage from "./features/cart/cartPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
