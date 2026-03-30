import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Home from './pages/Home'; // Now the Private Dashboard
import Landing from './pages/Landing';
import Analysis from './pages/Analysis';
import DiagnosticResult from './pages/DiagnosticResult';
import Registry from './pages/Registry/index';
import NewIntake from './pages/Registry/NewIntake';
import ActivePatients from './pages/Registry/ActivePatients';
import PatientHistory from './pages/Registry/PatientHistory';
import EditPatient from './pages/Registry/EditPatient';
import ProfessionalProfile from './pages/ProfessionalProfile';
import EditProfessionalProfile from './pages/EditProfessionalProfile';
import Settings from './pages/Settings';
import SecuritySettings from './pages/SecuritySettings';
import Sidebar from './components/Sidebar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import Platform from './pages/Platform';

import Security from './pages/Security';
import About from './pages/About';

function AppContent() {
  const location = useLocation();

  // Define auth and marketing paths
  const authPaths = ['/login', '/register', '/reset-password'];
  const marketingPaths = ['/', '/platform', '/security', '/about', '/Landing'];

  const isAuthPage = authPaths.includes(location.pathname);
  const isMarketingPage = marketingPaths.includes(location.pathname);

  // If we are on an auth page or marketing page, render the standalone layout
  if (isAuthPage || isMarketingPage) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
        <Routes>
          <Route path="/platform" element={<Platform />} />

          <Route path="/security" element={<Security />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  // PrivateRoute checks for authentication
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Authenticated Application Layout (Sidebar + Content)
  return (
    <div className="app-container font-sans bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-all duration-300 flex min-h-screen">
      <div className="sidebar-container hidden lg:block w-[280px] shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="main-content flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-0">
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
          <Routes>
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
            <Route path="/analysis/result" element={<PrivateRoute><DiagnosticResult /></PrivateRoute>} />
            <Route path="/registry" element={<PrivateRoute><Registry /></PrivateRoute>} />
            <Route path="/registry/new" element={<PrivateRoute><NewIntake /></PrivateRoute>} />
            <Route path="/registry/active" element={<PrivateRoute><ActivePatients /></PrivateRoute>} />
            <Route path="/registry/patient/:id" element={<PrivateRoute><PatientHistory /></PrivateRoute>} />
            <Route path="/registry/edit/:id" element={<PrivateRoute><EditPatient /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfessionalProfile /></PrivateRoute>} />
            <Route path="/profile/edit" element={<PrivateRoute><EditProfessionalProfile /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/settings/security" element={<PrivateRoute><SecuritySettings /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Duration matches roughly with preloader progress

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && <Preloader />}
      {!loading && <AppContent />}
    </Router>
  );
}

export default App;