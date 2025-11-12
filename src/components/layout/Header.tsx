import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, User, Camera, Utensils, Building, PieChart, LogIn, LogOut, Settings } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'carehome' | null>(null);
  
  // Simulate checking login status
  useEffect(() => {
    // In a real app, this would check for auth tokens or session data
    const checkLoginStatus = () => {
      // For demo purposes, we'll consider the user logged in if they're on certain pages
      const loggedInPages = [
        '/profile', 
        '/food-analysis', 
        '/recommendations',
        '/care-home',
        '/care-home/meal-planning',
        '/care-home/analytics'
      ];
      
      const isLoggedIn = loggedInPages.some(page => location.pathname.startsWith(page));
      setIsLoggedIn(isLoggedIn);
      
      // Determine user type based on URL
      if (location.pathname.startsWith('/care-home')) {
        setUserType('carehome');
      } else if (isLoggedIn) {
        setUserType('individual');
      } else {
        setUserType(null);
      }
    };
    
    checkLoginStatus();
  }, [location]);
  
  // Handle navigation based on user type
  
  // Navigation items for individual users
  const individualNavigation = [
    { name: 'Profile', href: '/profile', icon: <User size={24} /> },
    { name: 'Food Analysis', href: '/food-analysis', icon: <Camera size={24} /> },
    { name: 'Recommendations', href: '/recommendations', icon: <Utensils size={24} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={24} /> },
  ];
  
  // Navigation items for care homes
  const careHomeNavigation = [
    { name: 'Dashboard', href: '/care-home', icon: <Building size={24} /> },
    { name: 'Meal Planning', href: '/care-home/meal-planning', icon: <Utensils size={24} /> },
    { name: 'Food Analysis', href: '/care-home/food-analysis', icon: <Camera size={24} /> },
    { name: 'Analytics', href: '/care-home/analytics', icon: <PieChart size={24} /> },
    { name: 'Settings', href: '/care-home/settings', icon: <Settings size={24} /> },
  ];
  
  // Navigation items for logged out users
  const loggedOutNavigation = [
    { name: 'Home', href: '/', icon: <Home size={24} /> },
  ];
  
  // Determine which navigation to use
  const navigation = isLoggedIn
    ? (userType === 'carehome' ? careHomeNavigation : individualNavigation)
    : loggedOutNavigation;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center"
            onClick={isLoggedIn ? (e) => {
              e.preventDefault();
              if (userType === 'individual') {
                navigate('/profile');
              } else {
                navigate('/care-home');
              }
            } : undefined}
          >
            <span className="text-2xl font-bold text-blue-600">ZPIRE</span>
            <span className="text-2xl font-medium ml-1">Nutrition</span>
            {userType && (
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
                {userType === 'individual' ? 'Individual' : 'Care Home'}
              </span>
            )}
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center text-lg font-medium ${
                  location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            
            {/* Login/Logout button */}
            {isLoggedIn ? (
              <Link 
                to="/"
                className="flex items-center text-lg font-medium text-gray-600 hover:text-gray-900 ml-4"
                onClick={() => {
                  // In a real app, this would call a logout function
                  setIsLoggedIn(false);
                  setUserType(null);
                }}
              >
                <LogOut size={24} className="mr-2" />
                Logout
              </Link>
            ) : (
              <Link 
                to="/login"
                className="flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 ml-4"
              >
                <LogIn size={24} className="mr-2" />
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center py-3 px-4 rounded-lg text-xl font-medium ${
                    location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              
              {/* Login/Logout button for mobile */}
              {isLoggedIn ? (
                <Link 
                  to="/"
                  className="flex items-center py-3 px-4 rounded-lg text-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // In a real app, this would call a logout function
                    setIsLoggedIn(false);
                    setUserType(null);
                  }}
                >
                  <LogOut size={24} className="mr-3" />
                  Logout
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center py-3 px-4 rounded-lg text-xl font-medium text-blue-600 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={24} className="mr-3" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
