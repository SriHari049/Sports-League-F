import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Fixtures from './pages/Fixtures';
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import MatchDetails from './pages/MatchDetails';
import Players from './pages/Players';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Teams from './pages/Teams';
import Auth from './pages/Auth'; // ✅ New Auth page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />

          <Box component="main" sx={{ flex: 1, paddingTop: '64px', px: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} /> {/* ✅ Unified login/signup */}
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/players" element={<Players />} />
              <Route path="/leagues" element={<Leagues />} />
              <Route path="/about" element={<About />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/match/:team1/:team2" element={<MatchDetails />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
