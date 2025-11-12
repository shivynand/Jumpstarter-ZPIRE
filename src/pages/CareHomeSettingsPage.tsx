import { useState } from 'react';
import { Save, Bell, Building, Shield, Database, Users, Clock } from 'lucide-react';

const CareHomeSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('facility');
  const [settings, setSettings] = useState({
    // Facility settings
    facilityName: 'Sunshine Care Home',
    address: '123 Health Avenue, Wellness City',
    phone: '(555) 123-4567',
    email: 'admin@sunshinecare.com',
    
    // Meal settings
    breakfastTime: '07:30',
    lunchTime: '12:00',
    dinnerTime: '17:30',
    snackTime: '15:00',
    
    // Notification settings
    alertEmails: true,
    dailyReports: true,
    nutritionAlerts: true,
    staffNotifications: true,
    
    // Data settings
    dataRetentionPeriod: '2years',
    automaticBackups: true,
    anonymizeData: true,
    
    // Staff settings
    staffMembers: [
      { id: 1, name: 'Sarah Johnson', role: 'Administrator', email: 'sarah@sunshinecare.com' },
      { id: 2, name: 'Michael Chen', role: 'Nutritionist', email: 'michael@sunshinecare.com' },
      { id: 3, name: 'Emily Rodriguez', role: 'Kitchen Manager', email: 'emily@sunshinecare.com' },
      { id: 4, name: 'David Wilson', role: 'Care Staff', email: 'david@sunshinecare.com' }
    ]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      <h1 className="text-4xl font-bold mb-8">Care Home Settings</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'facility' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('facility')}
          >
            <Building size={20} className="mr-2" />
            Facility
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'meals' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('meals')}
          >
            <Clock size={20} className="mr-2" />
            Meal Times
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
              activeTab === 'data' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('data')}
          >
            <Database size={20} className="mr-2" />
            Data Management
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${
              activeTab === 'staff' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('staff')}
          >
            <Users size={20} className="mr-2" />
            Staff
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Facility Settings */}
            {activeTab === 'facility' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Facility Information</h2>
                
                <div>
                  <label className="block text-gray-700 mb-2">Facility Name</label>
                  <input
                    type="text"
                    name="facilityName"
                    value={settings.facilityName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Meal Settings */}
            {activeTab === 'meals' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Default Meal Times</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Breakfast Time</label>
                    <input
                      type="time"
                      name="breakfastTime"
                      value={settings.breakfastTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Lunch Time</label>
                    <input
                      type="time"
                      name="lunchTime"
                      value={settings.lunchTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Dinner Time</label>
                    <input
                      type="time"
                      name="dinnerTime"
                      value={settings.dinnerTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Snack Time</label>
                    <input
                      type="time"
                      name="snackTime"
                      value={settings.snackTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-blue-700">
                    These times will be used as defaults for meal planning. Individual meal plans can override these times.
                  </p>
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
                    id="alertEmails"
                    name="alertEmails"
                    checked={settings.alertEmails}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="alertEmails" className="font-medium">Alert Emails</label>
                    <p className="text-gray-600 text-sm">Receive email alerts for important notifications</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dailyReports"
                    name="dailyReports"
                    checked={settings.dailyReports}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="dailyReports" className="font-medium">Daily Reports</label>
                    <p className="text-gray-600 text-sm">Receive daily summary reports</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="nutritionAlerts"
                    name="nutritionAlerts"
                    checked={settings.nutritionAlerts}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="nutritionAlerts" className="font-medium">Nutrition Alerts</label>
                    <p className="text-gray-600 text-sm">Get alerts for nutrition compliance issues</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="staffNotifications"
                    name="staffNotifications"
                    checked={settings.staffNotifications}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="staffNotifications" className="font-medium">Staff Notifications</label>
                    <p className="text-gray-600 text-sm">Send notifications to staff members</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Data Management Settings */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Data Management</h2>
                
                <div>
                  <label className="block text-gray-700 mb-2">Data Retention Period</label>
                  <select
                    name="dataRetentionPeriod"
                    value={settings.dataRetentionPeriod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="5years">5 Years</option>
                    <option value="indefinite">Indefinite</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="automaticBackups"
                    name="automaticBackups"
                    checked={settings.automaticBackups}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="automaticBackups" className="font-medium">Automatic Backups</label>
                    <p className="text-gray-600 text-sm">Enable automatic daily backups of all data</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymizeData"
                    name="anonymizeData"
                    checked={settings.anonymizeData}
                    onChange={handleChange}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <label htmlFor="anonymizeData" className="font-medium">Anonymize Data for Reports</label>
                    <p className="text-gray-600 text-sm">Remove personally identifiable information from exported reports</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <div className="flex">
                    <Shield className="text-blue-600 mr-3 shrink-0" size={24} />
                    <div>
                      <h4 className="font-medium text-blue-800">Data Security</h4>
                      <p className="text-blue-700">
                        All resident data is encrypted and stored securely in compliance with healthcare privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Staff Settings */}
            {activeTab === 'staff' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Staff Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {settings.staffMembers.map((staff) => (
                        <tr key={staff.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{staff.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{staff.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button
                  type="button"
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Add Staff Member
                </button>
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

export default CareHomeSettingsPage;
