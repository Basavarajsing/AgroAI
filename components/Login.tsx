
import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('farmer@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-cream">
      <div className="p-8 bg-white rounded-xl shadow-2xl w-full max-w-md m-4 border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-brand-green p-3 rounded-full mb-4">
            <LeafIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-brand-green">Welcome to AgroAI</h1>
          <p className="text-gray-600 mt-2">Your partner in sustainable farming.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {isLoginView ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input 
                  className="bg-white shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" 
                  id="email" 
                  type="email" 
                  placeholder="farmer@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  className="bg-white shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" 
                  id="password" 
                  type="password" 
                  placeholder="******************" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input className="bg-white shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" id="name" type="text" placeholder="John Farmer" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                  Email Address
                </label>
                <input className="bg-white shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" id="signup-email" type="email" placeholder="farmer@example.com" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                  Password
                </label>
                <input className="bg-white shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-light-green" id="signup-password" type="password" placeholder="******************" />
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <button className="bg-brand-green hover:bg-brand-light-green text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full" type="submit">
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-brand-light-green hover:text-brand-green ml-1">
            {isLoginView ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;