import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './pages/LoadingScreen';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './ErrorBoundary';
import './styles/globals.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/dashboard" element={
          <ErrorBoundary><Dashboard /></ErrorBoundary>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
