import { useState } from 'react';
import { User, FileText, Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import the MedicalRecordsForm component
import MedicalRecordsForm from '../components/MedicalRecordsForm';

type TabType = 'basic' | 'medical';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    mobilityLevel: 'Full mobility',
    dietaryRestrictions: [] as string[],
    allergies: [] as string[],
    userType: 'elderly' // 'elderly' or 'caretaker'
  });

  const [medicalRecords, setMedicalRecords] = useState({
    conditions: [],
    medications: [],
    recentLabResults: {},
    familyHistory: [],
    notes: ''
  });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setProfile(prev => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name as keyof typeof prev] as string[], value]
        };
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        };
      }
    });
  };

  const handleUserTypeChange = (type: 'elderly' | 'caretaker') => {
    setProfile(prev => ({
      ...prev,
      userType: type
    }));
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (profile.password !== profile.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Move to medical records tab
    setActiveTab('medical');
  };

  const handleMedicalRecordsSave = (updatedRecords: any) => {
    setMedicalRecords(updatedRecords);
  };

  const handleSignUp = () => {
    // In a real app, this would send the data to a backend
    console.log('Signing up with:', { profile, medicalRecords });
    
    // Simulate successful signup
    alert('Account created successfully!');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold mb-8">Create Your Account</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'basic'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            <User className="inline-block mr-2" size={20} />
            Basic Information
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'medical'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('medical')}
            disabled={!profile.firstName || !profile.email || !profile.password || profile.password !== profile.confirmPassword}
          >
            <FileText className="inline-block mr-2" size={20} />
            Medical Records
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'basic' && (
            <form onSubmit={handleBasicInfoSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">I am a:</h2>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange('elderly')}
                    className={`flex-1 py-3 px-4 rounded-lg border ${
                      profile.userType === 'elderly'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Elderly Person
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange('caretaker')}
                    className={`flex-1 py-3 px-4 rounded-lg border ${
                      profile.userType === 'caretaker'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Caretaker
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleBasicInfoChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Password*</label>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password*</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleBasicInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={profile.height}
                    onChange={handleBasicInfoChange}
                    placeholder="e.g., 5'10 or 178 cm"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={profile.weight}
                    onChange={handleBasicInfoChange}
                    placeholder="e.g., 160 lbs or 73 kg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Mobility Level</label>
                <select
                  name="mobilityLevel"
                  value={profile.mobilityLevel}
                  onChange={handleBasicInfoChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="Full mobility">Full mobility</option>
                  <option value="Mostly independent">Mostly independent</option>
                  <option value="Limited mobility">Limited mobility</option>
                  <option value="Requires assistance">Requires assistance</option>
                  <option value="Wheelchair user">Wheelchair user</option>
                  <option value="Bedridden">Bedridden</option>
                </select>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Dietary Restrictions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Low sodium', 'Low sugar', 'Kosher', 'Halal'].map(restriction => (
                    <div key={restriction} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`restriction-${restriction}`}
                        name="dietaryRestrictions"
                        value={restriction}
                        checked={profile.dietaryRestrictions.includes(restriction)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={`restriction-${restriction}`}>{restriction}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Allergies</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Peanuts', 'Tree nuts', 'Shellfish', 'Fish', 'Eggs', 'Milk', 'Soy', 'Wheat'].map(allergy => (
                    <div key={allergy} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`allergy-${allergy}`}
                        name="allergies"
                        value={allergy}
                        checked={profile.allergies.includes(allergy)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={`allergy-${allergy}`}>{allergy}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
                >
                  Continue to Medical Records
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'medical' && (
            <div>
              <MedicalRecordsForm 
                medicalRecords={medicalRecords}
                onSave={handleMedicalRecordsSave}
              />
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setActiveTab('basic')}
                  className="border border-gray-300 bg-white text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50"
                >
                  Back to Basic Information
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
                >
                  <Save className="mr-2" size={20} />
                  Complete Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
