import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    userType: 'individual' // 'individual' or 'carehome'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (type: 'individual' | 'carehome') => {
    setCredentials(prev => ({
      ...prev,
      userType: type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would authenticate with a backend
    console.log('Logging in with:', credentials);
    
    // Simulate successful login - for demo, we'll just redirect to the appropriate page
    // regardless of credentials
    if (credentials.userType === 'individual') {
      // For individuals, redirect to profile page to simulate being logged in
      navigate('/profile');
    } else {
      // For care homes, redirect to care home dashboard
      navigate('/care-home');
    }
  };
  
  // Ensure we're using the correct user type based on URL parameters
  useEffect(() => {
    // Check if we came from the care home section
    const params = new URLSearchParams(location.search);
    const userType = params.get('userType');
    
    if (userType === 'carehome') {
      handleUserTypeChange('carehome');
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Home
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Log In</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">I am logging in as:</h2>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('individual')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    credentials.userType === 'individual'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  For Individuals
                </button>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('carehome')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    credentials.userType === 'carehome'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  For Care Homes
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
            >
              <LogIn className="mr-2" size={20} />
              Log In
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
