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

function App() {
  return (
    <ErrorBoundary>
      <Router>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
