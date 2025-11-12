import { useState } from 'react';
import { Save, Bell, Lock, User, Shield, Eye } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    email: 'eleanor.johnson@example.com',
    name: 'Eleanor Johnson',
    phone: '(555) 123-4567',
    
    // Notification settings
    emailNotifications: true,
    mealReminders: true,
    healthCheckInReminders: true,
    
    // Privacy settings
    shareHealthData: false,
    shareActivityData: false,
    
    // Accessibility settings
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to a backend
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'account' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('account')}
          >
            <User size={20} className="mr-2" />
            Account
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'notifications' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} className="mr-2" />
            Notifications
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'privacy' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('privacy')}
          >
            <Lock size={20} className="mr-2" />
            Privacy
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'accessibility' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('accessibility')}
          >
            <Eye size={20} className="mr-2" />
            Accessibility
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
                
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium">Email Notifications</label>
                    <p className="text-gray-600 text-sm">Receive notifications via email</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mealReminders"
                    name="mealReminders"
                    checked={settings.mealReminders}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="mealReminders" className="font-medium">Meal Reminders</label>
                    <p className="text-gray-600 text-sm">Get reminders for meal times</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="healthCheckInReminders"
                    name="healthCheckInReminders"
                    checked={settings.healthCheckInReminders}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="healthCheckInReminders" className="font-medium">Health Check-in Reminders</label>
                    <p className="text-gray-600 text-sm">Get daily reminders to complete your health check-in</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareHealthData"
                    name="shareHealthData"
                    checked={settings.shareHealthData}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="shareHealthData" className="font-medium">Share Health Data</label>
                    <p className="text-gray-600 text-sm">Allow sharing of anonymized health data for research purposes</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shareActivityData"
                    name="shareActivityData"
                    checked={settings.shareActivityData}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="shareActivityData" className="font-medium">Share Activity Data</label>
                    <p className="text-gray-600 text-sm">Allow sharing of anonymized activity data for research purposes</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <div className="flex">
                    <Shield className="text-blue-600 mr-3 shrink-0" size={24} />
                    <div>
                      <h4 className="font-medium text-blue-800">Your Privacy Matters</h4>
                      <p className="text-blue-700">
                        We take your privacy seriously. All data is encrypted and stored securely.
                        You can request deletion of your data at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Accessibility Settings */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Accessibility Settings</h2>
                
                <div>
                  <label className="block text-gray-700 mb-2">Font Size</label>
                  <select
                    name="fontSize"
                    value={settings.fontSize}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">Extra Large</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="highContrast"
                    name="highContrast"
                    checked={settings.highContrast}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="highContrast" className="font-medium">High Contrast Mode</label>
                    <p className="text-gray-600 text-sm">Increase contrast for better visibility</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reducedMotion"
                    name="reducedMotion"
                    checked={settings.reducedMotion}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="reducedMotion" className="font-medium">Reduced Motion</label>
                    <p className="text-gray-600 text-sm">Minimize animations throughout the app</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center"
              >
                <Save className="mr-2" size={20} />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
