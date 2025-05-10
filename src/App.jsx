import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Fixtures from './pages/Fixtures';
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Login from './pages/Login';
import Matches from './pages/Matches';
import Players from './pages/Players';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Schedule from './pages/Schedule';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/players" element={<Players />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
