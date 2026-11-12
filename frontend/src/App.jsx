import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ExchangeProvider } from "./context/ExchangeContext";
import { WardrobeProvider } from "./context/WardrobeContext";
import { ListingProvider } from "./context/ListingContext";

import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { AdminRoute } from "./components/common/AdminRoute";

import { HomePage } from "./pages/HomePage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { SellPage } from "./pages/SellPage";
import { MyListingsPage } from "./pages/MyListingsPage";
import { ExchangeMarketplacePage } from "./pages/ExchangeMarketplacePage";
import { ExchangeManagementPage } from "./pages/ExchangeManagementPage";
import { FitMatchPage } from "./pages/FitMatchPage";
import { WardrobePage } from "./pages/WardrobePage";
import { AIStylistPage } from "./pages/AIStylistPage";
import { SmartShoppingPage } from "./pages/SmartShoppingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WishlistPage } from "./pages/WishlistPage";
import { SupportPages } from "./pages/SupportPages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ExchangeProvider>
              <WardrobeProvider>
                <ListingProvider>
                  <Routes>
                    {/* Main Customer Facing Layout */}
                    <Route element={<MainLayout />}>
                      {/* Public Browsing Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/marketplace" element={<MarketplacePage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/exchange" element={<ExchangeMarketplacePage />} />
                      <Route path="/fitmatch" element={<FitMatchPage />} />
                      <Route path="/wardrobe" element={<WardrobePage />} />
                      <Route path="/stylist" element={<AIStylistPage />} />
                      <Route path="/smart-shopping" element={<SmartShoppingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="/support/:section" element={<SupportPages />} />
                      <Route path="/support" element={<Navigate to="/support/about" replace />} />

                      {/* Customer Authenticated Routes (Defense-in-depth guard) */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/orders" element={<OrderHistoryPage />} />
                        <Route path="/sell" element={<SellPage />} />
                        <Route path="/my-listings" element={<MyListingsPage />} />
                        <Route path="/exchange/manage" element={<ExchangeManagementPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                      </Route>
                    </Route>

                    {/* Dedicated Admin Portal (Protected by Admin Role Guard) */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboardPage />} />
                      </Route>
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </ListingProvider>
              </WardrobeProvider>
            </ExchangeProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
