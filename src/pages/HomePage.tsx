import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, User, Utensils, Building, Heart, Users, LogIn, UserPlus, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const [userType, setUserType] = useState<'none' | 'individual' | 'carehome'>('none');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">ZPIRE Nutrition</h1>
      
      {userType === 'none' ? (
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Welcome! How would you like to use ZPIRE Nutrition?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <UserTypeButton 
              onClick={() => setUserType('individual')}
              icon={<Heart size={64} />}
              label="For Individuals"
              description="Elderly individuals or their caretakers"
            />
            
            <UserTypeButton 
              onClick={() => setUserType('carehome')}
              icon={<Building size={64} />}
              label="For Care Homes"
              description="Institutions managing multiple residents"
            />
          </div>
        </div>
      ) : userType === 'individual' ? (
        <div>
          <button 
            onClick={() => setUserType('none')}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to user selection
          </button>
          
          <h2 className="text-2xl font-semibold mb-6 text-center">For Individuals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <NavButton 
              to="/login" 
              icon={<LogIn size={40} />} 
              label="Log In" 
              description="Access your existing account"
            />
            
            <NavButton 
              to="/signup" 
              icon={<UserPlus size={40} />} 
              label="Sign Up" 
              description="Create a new account"
            />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Features for Individuals</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <FeatureCard 
                icon={<User size={40} />} 
                label="Personal Profile" 
                description="Store your health information and dietary preferences"
              />
              
              <FeatureCard 
                icon={<Camera size={40} />} 
                label="Food Analysis" 
                description="Take a photo of your meal for personalized nutritional analysis"
              />
              
              <FeatureCard 
                icon={<Utensils size={40} />} 
                label="Meal Recommendations" 
                description="Get personalized nutrition advice based on your health profile"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setUserType('none')}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to user selection
          </button>
          
          <h2 className="text-2xl font-semibold mb-6 text-center">For Care Homes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <NavButton 
              to="/login?userType=carehome" 
              icon={<LogIn size={40} />} 
              label="Log In" 
              description="Access your care home account"
            />
            
            <NavButton 
              to="/contact" 
              icon={<Building size={40} />} 
              label="Contact Us" 
              description="Get in touch to set up your care home account"
            />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Features for Care Homes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <FeatureCard 
                icon={<Users size={40} />} 
                label="Resident Management" 
                description="Manage and monitor residents' nutrition profiles"
              />
              
              <FeatureCard 
                icon={<Utensils size={40} />} 
                label="Meal Planning" 
                description="Plan and track meals for all residents"
              />
              
              <FeatureCard 
                icon={<TrendingUp size={40} />} 
                label="Nutrition Analytics" 
                description="Access detailed analytics and reports on resident nutrition"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Navigation button component
const NavButton = ({ to, icon, label, description }: {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <Link 
      to={to}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-2">{label}</h2>
      <p className="text-gray-600 text-center">{description}</p>
    </Link>
  );
};

// User type selection button
const UserTypeButton = ({ onClick, icon, label, description }: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full"
    >
      <div className="text-blue-600 mb-6">{icon}</div>
      <h2 className="text-3xl font-semibold mb-3">{label}</h2>
      <p className="text-gray-600 text-center text-lg">{description}</p>
    </button>
  );
};

// Feature card component for homepage
const FeatureCard = ({ icon, label, description }: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default HomePage;
