import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import HomePage from "./pages/HomePage";
import PlayerListPage from "./features/players/PlayerListPage";
import PlayerDetailPage from "./features/players/PlayerDetailPage";
import LeagueListPage from "./features/leagues/LeagueListPage";
import LeagueDetailPage from "./features/leagues/LeagueDetailPage";
import FixtureListPage from "./features/fixtures/FixtureListPage";
import FixtureDetailPage from "./features/fixtures/FixtureDetailPage";
import NewsListPage from "./features/news/NewsListPage";
import NewsDetailPage from "./features/news/NewsDetailPage";
import ProductListPage from "./features/products/ProductListPage";
import ProductDetailPage from "./features/products/ProductDetailPage";
import CartPage from "./features/cart/CartPage";
import CheckoutPage from "./features/cart/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProfilePage from "./features/auth/ProfilePage";
import OrderHistoryPage from "./features/orders/OrderHistoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ProductsPage from "./pages/admin/ProductsPage";
import PlayersPage from "./pages/admin/PlayersPage";
import LeaguesPage from "./pages/admin/LeaguesPage";
import FixturesPage from "./pages/admin/FixturesPage";
import NewsPage from "./pages/admin/NewsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ReportsPage from "./pages/admin/ReportsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/players" element={<PlayerListPage />} />
        <Route path="/players/:id" element={<PlayerDetailPage />} />
        <Route path="/leagues" element={<LeagueListPage />} />
        <Route path="/leagues/:id" element={<LeagueDetailPage />} />
        <Route path="/fixtures" element={<FixtureListPage />} />
        <Route path="/fixtures/:id" element={<FixtureDetailPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/players"
          element={
            <AdminRoute>
              <PlayersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/leagues"
          element={
            <AdminRoute>
              <LeaguesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/fixtures"
          element={
            <AdminRoute>
              <FixturesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <AdminRoute>
              <NewsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <ReportsPage />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
