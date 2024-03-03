import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './contexts/authContext';

function App() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <Home />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
