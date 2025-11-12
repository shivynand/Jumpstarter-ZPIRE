import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Search, UserPlus, Camera,
  TrendingUp, AlertCircle, Utensils, Clock, 
  Activity, FileText, Calendar as CalendarIcon
} from 'lucide-react';

// Import chart components
import NutritionComplianceChart from '../components/charts/NutritionComplianceChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import DietaryDistributionChart from '../components/charts/DietaryDistributionChart';

const CareHomePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('week');
  
  // Chart data for nutrition compliance
  const complianceChartData = {
    labels: ['Diabetic', 'Low Sodium', 'High Protein', 'Soft Diet', 'Vegetarian'],
    values: [82, 91, 88, 85, 93],
    colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#14b8a6']
  };
  
  // Chart data for dietary distribution
  const dietaryDistributionData = {
    labels: ['Diabetic', 'Low Sodium', 'Soft Diet', 'High Protein', 'Vegetarian'],
    values: [16, 19, 11, 9, 5],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#14b8a6']
  };
  
  // Chart data for trends
  const trendChartData = {
    labels: ['Oct 12', 'Oct 19', 'Oct 26', 'Nov 2', 'Nov 9'],
    datasets: [
      {
        label: 'Nutrition Compliance',
        data: [81, 83, 85, 84, 87],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)'
      },
      {
        label: 'Cost per Resident ($)',
        data: [8.95, 8.82, 8.67, 8.55, 8.42],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      },
      {
        label: 'Food Waste (%)',
        data: [15, 14, 13, 12, 12],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)'
      }
    ]
  };
  
  // Mock data for residents
  const residents = [
    {
      id: 1,
      name: "Eleanor Johnson",
      age: 78,
      room: "103A",
      healthStatus: "Stable",
      dietaryNeeds: "Low sodium, Diabetic",
      recentMeals: [
        { date: "2025-11-11", quality: "Good", concerns: "None" },
        { date: "2025-11-10", quality: "Fair", concerns: "Low protein intake" }
      ]
    },
    {
      id: 2,
      name: "Robert Williams",
      age: 82,
      room: "105B",
      healthStatus: "Needs attention",
      dietaryNeeds: "Soft foods, High protein",
      recentMeals: [
        { date: "2025-11-11", quality: "Poor", concerns: "Barely ate" },
        { date: "2025-11-10", quality: "Fair", concerns: "Low appetite" }
      ]
    },
    {
      id: 3,
      name: "Margaret Davis",
      age: 75,
      room: "110A",
      healthStatus: "Good",
      dietaryNeeds: "Vegetarian, High fiber",
      recentMeals: [
        { date: "2025-11-11", quality: "Excellent", concerns: "None" },
        { date: "2025-11-10", quality: "Good", concerns: "None" }
      ]
    },
    {
      id: 4,
      name: "Thomas Brown",
      age: 85,
      room: "107C",
      healthStatus: "Stable",
      dietaryNeeds: "Pureed foods, Thickened liquids",
      recentMeals: [
        { date: "2025-11-11", quality: "Good", concerns: "None" },
        { date: "2025-11-10", quality: "Good", concerns: "None" }
      ]
    }
  ];
  
  // Filter residents based on search term
  const filteredResidents = residents.filter(resident => 
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.dietaryNeeds.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Care Home Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`py-4 px-6 font-medium flex items-center ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp className="mr-2" size={20} />
            Dashboard
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText className="mr-2" size={20} />
            Reports
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Facility Overview</h2>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Time Period:</span>
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-600 font-medium">Total Residents</p>
                    <h3 className="text-3xl font-bold mt-2">42</h3>
                  </div>
                  <Users className="text-blue-500" size={32} />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-600 font-medium">+2</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-600 font-medium">Nutrition Compliance</p>
                    <h3 className="text-3xl font-bold mt-2">87%</h3>
                  </div>
                  <Activity className="text-green-500" size={32} />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-600 font-medium">+5%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-amber-600 font-medium">Dietary Alerts</p>
                    <h3 className="text-3xl font-bold mt-2">8</h3>
                  </div>
                  <AlertCircle className="text-amber-500" size={32} />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="text-red-500 mr-1 rotate-180" size={16} />
                  <span className="text-red-600 font-medium">+3</span>
                  <span className="text-gray-500 ml-1">from last week</span>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-600 font-medium">Food Cost/Resident</p>
                    <h3 className="text-3xl font-bold mt-2">$8.42</h3>
                  </div>
                  <Utensils className="text-purple-500" size={32} />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="text-green-500 mr-1 rotate-180" size={16} />
                  <span className="text-green-600 font-medium">-$0.37</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
            
            {/* Nutrition Compliance Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 border col-span-2 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Nutrition Compliance Trends</h3>
                  <Link to="/care-home/analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    View Detailed Analytics
                  </Link>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <TrendLineChart data={trendChartData} yAxisSuffix="%" />
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Showing data for {dateRange === 'day' ? 'today' : dateRange === 'week' ? 'this week' : dateRange === 'month' ? 'this month' : 'this quarter'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Dietary Needs Distribution</h3>
                <DietaryDistributionChart data={dietaryDistributionData} />
              </div>
            </div>
            
            {/* Recent Alerts and Upcoming Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Recent Dietary Alerts</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
                    <AlertCircle className="text-red-500 mr-3 shrink-0" size={20} />
                    <div>
                      <p className="font-medium">Eleanor Johnson (Room 103A)</p>
                      <p className="text-gray-600">Missed 2 consecutive meals</p>
                      <p className="text-sm text-gray-500 mt-1">Today, 10:45 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="text-amber-500 mr-3 shrink-0" size={20} />
                    <div>
                      <p className="font-medium">Robert Williams (Room 105B)</p>
                      <p className="text-gray-600">Sodium intake exceeded recommended limit</p>
                      <p className="text-sm text-gray-500 mt-1">Yesterday, 6:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="text-amber-500 mr-3 shrink-0" size={20} />
                    <div>
                      <p className="font-medium">Thomas Brown (Room 107C)</p>
                      <p className="text-gray-600">Protein intake below recommended level</p>
                      <p className="text-sm text-gray-500 mt-1">Yesterday, 1:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Today's Meal Plan</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Full Schedule</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Clock className="text-blue-500 mr-3 shrink-0" size={20} />
                    <div className="w-full">
                      <div className="flex justify-between">
                        <p className="font-medium">Breakfast</p>
                        <p className="text-sm text-gray-500">7:30 AM - 9:00 AM</p>
                      </div>
                      <p className="text-gray-600">Oatmeal with Berries, Whole Grain Toast, Scrambled Eggs</p>
                      <div className="flex mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">42 Servings</span>
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">5 Special Diets</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Clock className="text-blue-500 mr-3 shrink-0" size={20} />
                    <div className="w-full">
                      <div className="flex justify-between">
                        <p className="font-medium">Lunch</p>
                        <p className="text-sm text-gray-500">12:00 PM - 1:30 PM</p>
                      </div>
                      <p className="text-gray-600">Grilled Chicken Salad, Whole Grain Roll, Fresh Fruit</p>
                      <div className="flex mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">42 Servings</span>
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">8 Special Diets</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Clock className="text-gray-500 mr-3 shrink-0" size={20} />
                    <div className="w-full">
                      <div className="flex justify-between">
                        <p className="font-medium">Dinner</p>
                        <p className="text-sm text-gray-500">5:30 PM - 7:00 PM</p>
                      </div>
                      <p className="text-gray-600">Baked Salmon, Steamed Vegetables, Brown Rice</p>
                      <div className="flex mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">42 Servings</span>
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">7 Special Diets</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'residents' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search residents or dietary needs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-lg"
                />
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center">
                <UserPlus size={20} className="mr-2" />
                Add Resident
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Age</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Room</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Health Status</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Dietary Needs</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Last Meal Quality</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResidents.map((resident) => (
                    <tr key={resident.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">{resident.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">{resident.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">{resident.room}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          resident.healthStatus === 'Good' 
                            ? 'bg-green-100 text-green-800' 
                            : resident.healthStatus === 'Stable'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {resident.healthStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-lg">{resident.dietaryNeeds}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          resident.recentMeals[0].quality === 'Excellent' || resident.recentMeals[0].quality === 'Good'
                            ? 'bg-green-100 text-green-800' 
                            : resident.recentMeals[0].quality === 'Fair'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {resident.recentMeals[0].quality}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredResidents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-lg text-gray-500">No residents found matching your search.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'meals' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Meal Planning</h2>
              <Link to="/care-home/meal-planning" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                <Utensils className="mr-2" size={18} />
                Advanced Meal Planning
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 border shadow-sm col-span-2">
                <h3 className="text-xl font-semibold mb-4">Weekly Meal Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Day</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Breakfast</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Lunch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dinner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">Monday</td>
                        <td className="px-4 py-3">Oatmeal with Berries</td>
                        <td className="px-4 py-3">Grilled Chicken Salad</td>
                        <td className="px-4 py-3">Baked Salmon with Vegetables</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">Tuesday</td>
                        <td className="px-4 py-3">Whole Grain Toast with Eggs</td>
                        <td className="px-4 py-3">Vegetable Soup with Roll</td>
                        <td className="px-4 py-3">Turkey Meatloaf with Sweet Potatoes</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">Wednesday</td>
                        <td className="px-4 py-3">Yogurt with Granola</td>
                        <td className="px-4 py-3">Tuna Sandwich with Fruit</td>
                        <td className="px-4 py-3">Chicken Stir-Fry with Brown Rice</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">Thursday</td>
                        <td className="px-4 py-3">Breakfast Burrito</td>
                        <td className="px-4 py-3">Quinoa Salad with Chickpeas</td>
                        <td className="px-4 py-3">Beef Stew with Vegetables</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">Friday</td>
                        <td className="px-4 py-3">Whole Grain Pancakes</td>
                        <td className="px-4 py-3">Mediterranean Wrap</td>
                        <td className="px-4 py-3">Baked Cod with Roasted Vegetables</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Special Diets</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Diabetic</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">16 residents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Low Sodium</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">19 residents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Soft Diet</span>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">11 residents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>High Protein</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">9 residents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vegetarian</span>
                      <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">5 residents</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Meal Stats</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Nutrition Compliance</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Resident Satisfaction</span>
                        <span className="font-medium">84%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Food Waste</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Meal Planning Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-800 mb-2">Nutrition Optimization</h4>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Increase calcium-rich foods in breakfast options</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Add more high-fiber options to lunch and dinner menus</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Cost Reduction</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Batch prepare high-protein meals to reduce costs</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Adjust portion sizes based on consumption data</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2">Satisfaction Improvement</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Replace vegetable casserole with more popular alternatives</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Increase variety in soft diet menu options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Nutrition Reports</h2>
              <div className="flex items-center space-x-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last 90 Days</option>
                  <option value="year">Last 12 Months</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                  <FileText size={18} className="mr-2" />
                  Export Reports
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Nutrition Compliance Report</h3>
                <div className="mb-4">
                  <NutritionComplianceChart data={complianceChartData} />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dietary Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Residents</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Compliance</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3">Diabetic</td>
                        <td className="px-4 py-3">16</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="mr-2">82%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            <span>+3%</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Low Sodium</td>
                        <td className="px-4 py-3">19</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="mr-2">91%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            <span>+5%</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Soft Diet</td>
                        <td className="px-4 py-3">11</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="mr-2">85%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            <span>+2%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Nutritional Deficiencies Report</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Protein</span>
                      <span className="font-medium">18% of residents</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calcium</span>
                      <span className="font-medium">24% of residents</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Vitamin D</span>
                      <span className="font-medium">32% of residents</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Fiber</span>
                      <span className="font-medium">22% of residents</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Iron</span>
                      <span className="font-medium">15% of residents</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cost Analysis Report</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Cost Per Resident/Day</span>
                    <span className="font-medium">$8.42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Food Budget</span>
                    <span className="font-medium">$10,600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Food Waste Cost</span>
                    <span className="font-medium text-red-600">$1,272</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Potential Monthly Savings</span>
                    <span className="font-medium text-green-600">$1,240</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Trend (3 months)</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp size={16} className="mr-1 rotate-180" />
                      <span>-4.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Resident Satisfaction Report</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Overall Satisfaction</span>
                      <span className="font-medium">84%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">By Meal Type</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Breakfast</span>
                        <span className="font-medium">86%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Lunch</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dinner</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Snacks</span>
                        <span className="font-medium">88%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'foodAnalysis' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Food Analysis</h2>
              <Link to="/care-home/food-analysis" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                <Camera size={18} className="mr-2" />
                Full Analysis Tool
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Analyze Meal Photos</h3>
                <p className="text-gray-600 mb-4">
                  Take photos of meals served to residents to analyze nutritional content and ensure compliance with dietary requirements.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">Benefits:</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Verify nutritional content of meals being served</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Ensure compliance with dietary restrictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Track portion sizes and consistency</span>
                    </li>
                  </ul>
                </div>
                <Link to="/care-home/food-analysis" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center">
                  <Camera size={18} className="mr-2" />
                  Analyze Meal
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Recent Analyses</h3>
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 mr-3">
                      <img 
                        src="https://www.eatalianwithroberto.com/wp-content/uploads/2023/01/Spaghetti-alla-bolognese-enjoy.jpg" 
                        alt="Spaghetti Bolognese" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Spaghetti Bolognese</p>
                      <p className="text-gray-600">670 calories, 30g protein, 78g carbs</p>
                      <p className="text-sm text-gray-500 mt-1">Analyzed today, 11:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 mr-3">
                      <img 
                        src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roast-chicken-b8368c3.jpg" 
                        alt="Roast Chicken" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Roast Chicken with Vegetables</p>
                      <p className="text-gray-600">520 calories, 42g protein, 35g carbs</p>
                      <p className="text-sm text-gray-500 mt-1">Analyzed yesterday, 5:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 mr-3">
                      <img 
                        src="https://www.acouplecooks.com/wp-content/uploads/2019/05/Chopped-Salad-001.jpg" 
                        alt="Garden Salad" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Garden Salad with Grilled Chicken</p>
                      <p className="text-gray-600">320 calories, 28g protein, 12g carbs</p>
                      <p className="text-sm text-gray-500 mt-1">Analyzed yesterday, 12:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Nutrition Analytics</h2>
              <Link to="/care-home/analytics" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                <TrendingUp size={18} className="mr-2" />
                Advanced Analytics
              </Link>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <TrendingUp size={48} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics Dashboard</h3>
              <p className="text-blue-700 mb-4">Access our comprehensive analytics dashboard for in-depth nutritional data analysis.</p>
              <Link to="/care-home/analytics" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center">
                Go to Analytics Dashboard
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Facility Information</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Facility Name</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                        defaultValue="Sunshine Care Home"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Address</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                        defaultValue="123 Health Avenue, Wellness City"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Contact Number</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Administrator Email</label>
                      <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                        defaultValue="admin@sunshinecare.com"
                      />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Nutrition Settings</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-700 mb-1 flex items-center">
                        <CalendarIcon size={16} className="mr-2 text-blue-600" />
                        Default Meal Times
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm text-gray-600">Breakfast</label>
                          <input 
                            type="time" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            defaultValue="07:30"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Lunch</label>
                          <input 
                            type="time" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            defaultValue="12:00"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Dinner</label>
                          <input 
                            type="time" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            defaultValue="17:30"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Snack</label>
                          <input 
                            type="time" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            defaultValue="15:00"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Nutrition Compliance Threshold</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option>80%</option>
                        <option selected>85%</option>
                        <option>90%</option>
                        <option>95%</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="alerts" className="mr-2" checked />
                      <label htmlFor="alerts">Enable Nutrition Alerts</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="reports" className="mr-2" checked />
                      <label htmlFor="reports">Weekly Nutrition Reports</label>
                    </div>
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-white rounded-xl p-5 border shadow-sm">
                <h3 className="text-xl font-semibold mb-4">User Management</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Administrator</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-gray-600">Nutritionist</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-gray-600">Kitchen Manager</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">David Wilson</p>
                      <p className="text-sm text-gray-600">Care Staff</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                    <UserPlus size={18} className="mr-2" />
                    Add New User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareHomePage;
