import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      localStorage.removeItem('user');
      if (data.message) {
        toast.success(data.message);
      }
      navigate('/login');
      setUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, logout];
}

export default useLogout;
