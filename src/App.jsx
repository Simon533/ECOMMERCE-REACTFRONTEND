import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
// @ts-expect-error ShopPage is a JSX module without a TypeScript declaration.
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Protected Routes (Require Authentication) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}