import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, User, Utensils, Building, Heart, Users } from 'lucide-react';

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
              label="Individual User"
              description="For elderly individuals or their caretakers"
            />
            
            <UserTypeButton 
              onClick={() => setUserType('carehome')}
              icon={<Building size={64} />}
              label="Care Home / Hospital"
              description="For institutions managing multiple residents"
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
          
          <h2 className="text-2xl font-semibold mb-6 text-center">Individual User Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <NavButton 
              to="/profile" 
              icon={<User size={40} />} 
              label="My Profile" 
              description="View and update your health information"
            />
            
            <NavButton 
              to="/food-analysis" 
              icon={<Camera size={40} />} 
              label="Analyze Food" 
              description="Take a photo of your meal for analysis"
            />
            
            <NavButton 
              to="/recommendations" 
              icon={<Utensils size={40} />} 
              label="My Recommendations" 
              description="View your personalized nutrition advice"
            />
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
          
          <h2 className="text-2xl font-semibold mb-6 text-center">Care Home Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <NavButton 
              to="/care-home" 
              icon={<Users size={40} />} 
              label="Resident Management" 
              description="Manage and monitor residents' nutrition"
            />
            
            <NavButton 
              to="/care-home/meal-planning" 
              icon={<Utensils size={40} />} 
              label="Meal Planning" 
              description="Plan and track meals for residents"
            />
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

export default HomePage;
