import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';

// Importing ToastContainer
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

// src/App.js
import { motion } from 'framer-motion';
import ErrorBoundary from './pages/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import { Provider } from 'react-redux';
import store from './store/store';
import FavoritesPage from './pages/FavoritePage';
import CartPage from './pages/CartPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AuthProviders from '../providers/AuthProviders';
import InteceptorProvider from '../providers/InteceptorProvider';
import EmailVerification from './pages/EmailVerification';
import ProtectedRoute from '../providers/ProtectedRoute';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';
import ProductsPage from './pages/ProductPage2';

function App() {
  const { t } = useTranslation();
  return (
    <ErrorBoundary>
      <Router>
        <Provider store={store}>
          <InteceptorProvider>
            <AuthProviders>
              <Navbar />
              {/* Add ToastContainer for global toast notifications */}
              <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={'font-medium '}

              />

              <Routes>
                <Route
                  path="/signin"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SignIn />
                    </motion.div>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SignUp />
                    </motion.div>
                  }
                />
                <Route
                  path="/verify-email"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EmailVerification />
                    </motion.div>
                  }
                />
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <HomePage />
                    </motion.div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductsPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FavoritesPage />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CartPage />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </AuthProviders>
          </InteceptorProvider>
        </Provider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
