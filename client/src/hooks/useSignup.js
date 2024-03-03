import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    try {
      if (
        !handleInputErrors({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        })
      )
        return;
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.error) {
        throw new Error(res.error);
      }

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

  return [loading, signup];
};

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill all inputs!');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Password not match!');
    return false;
  }

  return true;
}
