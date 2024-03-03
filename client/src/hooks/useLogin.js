import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    if (!validateInputErrors({ username, password })) return;

    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, login];
}

export default useLogin;

function validateInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error('Please fill all the fields!');
    return false;
  }

  return true;
}
