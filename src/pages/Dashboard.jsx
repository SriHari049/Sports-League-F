import AdminPanel from './AdminPanel';
import Profile from './Profile';
import { useAuth } from '../contexts/AuthContext';


const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'admin') return <AdminPanel />;
  return <Profile />;
};

export default Dashboard;
