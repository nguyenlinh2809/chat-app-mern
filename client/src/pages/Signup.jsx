import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

function Signup() {
  const [formValue, setFormValue] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, signup] = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formValue);
  };

  const handleChange = (e) => {
    setFormValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormValue((value) => ({
      ...value,
      gender,
    }));
  };

  return (
    <div className="min-w-[400px]  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex flex-col gap-4 p-4">
      <h1 className="text-center text-white text-3xl mb-4">Signup Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Full name"
            name="fullName"
            value={setFormValue.fullName}
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="User name"
            name="username"
            value={setFormValue.username}
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type={hidePassword ? 'password' : 'text'}
            className="grow"
            placeholder="Password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 cursor-pointer"
            onClick={() => setHidePassword((showPassword) => !showPassword)}
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={handleChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <label className="flex items-center gap-2 bg-white p-4 rounded-lg">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="radio-1"
            className="radio"
            checked={formValue.gender === 'male'}
            onChange={() => handleGenderChange('male')}
          />
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="radio-1"
            className="radio"
            checked={formValue.gender === 'female'}
            onChange={() => handleGenderChange('female')}
          />
        </label>

        <button
          className="btn btn-primary !text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Signup'}
        </button>
      </form>

      <div className="text-white text-center">
        <span className="text-sm mr-2">Already have account?</span>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
