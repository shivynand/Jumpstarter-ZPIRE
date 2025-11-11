import { useState } from 'react';
import { User, FileText, Save, AlertCircle } from 'lucide-react';
import MedicalRecordsForm from '../components/MedicalRecordsForm';

type TabType = 'basic' | 'medical';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    birthplace: '',
    foodPreferences: '',
    birthday: '',
    genetics: '',
    lifestyle: '',
    height: '',
    weight: '',
    mobilityLevel: '',
    dietaryRestrictions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data
    console.log('Profile data:', profile);
    alert('Basic profile information saved successfully!');
  };
  
  const handleMedicalRecordsSave = (medicalData: any) => {
    console.log('Medical records data:', medicalData);
    alert('Medical records saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Health Profile</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 max-w-5xl mx-auto">
        <div className="flex">
          <AlertCircle size={24} className="text-blue-600 mr-2 shrink-0" />
          <div>
            <p className="text-blue-700 font-medium">Why complete your profile?</p>
            <p className="text-blue-600">
              The more information you provide, the more personalized your nutrition recommendations will be. 
              All information is kept private and secure.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex items-center py-3 px-6 text-lg font-medium ${
              activeTab === 'basic' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User size={20} className="mr-2" />
            Basic Information
          </button>
          
          <button
            onClick={() => setActiveTab('medical')}
            className={`flex items-center py-3 px-6 text-lg font-medium ${
              activeTab === 'medical' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText size={20} className="mr-2" />
            Medical Records
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'basic' ? (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <form onSubmit={handleBasicInfoSubmit}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <User size={24} className="text-blue-600 mr-2" />
                Basic Information
              </h2>
              
              <div className="mb-6">
                <label className="block text-xl mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-xl mb-2" htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your age"
                  />
                </div>
                
                <div>
                  <label className="block text-xl mb-2" htmlFor="birthday">Birthday</label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={profile.birthday}
                    onChange={handleChange}
                    className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xl mb-2" htmlFor="birthplace">Birth Place</label>
                  <input
                    type="text"
                    id="birthplace"
                    name="birthplace"
                    value={profile.birthplace}
                    onChange={handleChange}
                    className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Where were you born?"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xl mb-2" htmlFor="height">Height</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 5'10 or 178 cm"
                  />
                </div>
                
                <div>
                  <label className="block text-xl mb-2" htmlFor="weight">Weight</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                    className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 160 lbs or 73 kg"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-xl mb-2" htmlFor="mobilityLevel">Mobility Level</label>
                <select
                  id="mobilityLevel"
                  name="mobilityLevel"
                  value={profile.mobilityLevel}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Mobility Level</option>
                  <option value="fully_mobile">Fully Mobile</option>
                  <option value="mobile_with_assistance">Mobile with Assistance</option>
                  <option value="limited_mobility">Limited Mobility</option>
                  <option value="wheelchair">Wheelchair User</option>
                  <option value="bedridden">Bedridden</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-xl mb-2" htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={profile.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="List any dietary restrictions (e.g., vegetarian, gluten-free)"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-xl mb-2" htmlFor="foodPreferences">Food Preferences</label>
                <textarea
                  id="foodPreferences"
                  name="foodPreferences"
                  value={profile.foodPreferences}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="What foods do you enjoy eating?"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-xl mb-2" htmlFor="genetics">Family Health History</label>
                <textarea
                  id="genetics"
                  name="genetics"
                  value={profile.genetics}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Any family health conditions we should know about?"
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-xl mb-2" htmlFor="lifestyle">Lifestyle Habits</label>
                <textarea
                  id="lifestyle"
                  name="lifestyle"
                  value={profile.lifestyle}
                  onChange={handleChange}
                  className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your activity level, sleep patterns, etc."
                />
              </div>
              
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md text-xl flex items-center"
                >
                  <Save size={20} className="mr-2" />
                  Save Basic Information
                </button>
              </div>
            </form>
          </div>
        ) : (
          <MedicalRecordsForm onSave={handleMedicalRecordsSave} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
