import { useState } from 'react';
import { 
  PieChart, BarChart, TrendingUp, Download, Filter, 
  Calendar, ArrowRight, Users, Utensils, Activity
} from 'lucide-react';

const NutritionAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('nutritionCompliance');
  const [selectedDietaryType, setSelectedDietaryType] = useState('all');
  const [selectedResidentGroup, setSelectedResidentGroup] = useState('all');
  
  // Mock data for analytics
  const nutritionComplianceData = {
    overall: 87,
    byDietaryType: {
      diabetic: 82,
      lowSodium: 91,
      highProtein: 88,
      softDiet: 85,
      vegetarian: 93
    },
    trend: [
      { date: '2025-10-12', value: 81 },
      { date: '2025-10-19', value: 83 },
      { date: '2025-10-26', value: 85 },
      { date: '2025-11-02', value: 84 },
      { date: '2025-11-09', value: 87 }
    ]
  };
  
  const costData = {
    averagePerResident: 8.42,
    byDietaryType: {
      diabetic: 9.15,
      lowSodium: 8.75,
      highProtein: 10.20,
      softDiet: 7.85,
      vegetarian: 8.95
    },
    trend: [
      { date: '2025-10-12', value: 8.95 },
      { date: '2025-10-19', value: 8.82 },
      { date: '2025-10-26', value: 8.67 },
      { date: '2025-11-02', value: 8.55 },
      { date: '2025-11-09', value: 8.42 }
    ],
    potentialSavings: 1240
  };
  
  const wasteData = {
    overall: 12, // percentage
    byMealType: {
      breakfast: 8,
      lunch: 14,
      dinner: 15,
      snacks: 7
    },
    trend: [
      { date: '2025-10-12', value: 15 },
      { date: '2025-10-19', value: 14 },
      { date: '2025-10-26', value: 13 },
      { date: '2025-11-02', value: 12 },
      { date: '2025-11-09', value: 12 }
    ],
    potentialSavings: 850
  };
  
  const nutritionalDeficiencies = [
    { nutrient: 'Protein', percentage: 18, affectedResidents: 8 },
    { nutrient: 'Calcium', percentage: 24, affectedResidents: 10 },
    { nutrient: 'Vitamin D', percentage: 32, affectedResidents: 14 },
    { nutrient: 'Fiber', percentage: 22, affectedResidents: 9 },
    { nutrient: 'Iron', percentage: 15, affectedResidents: 6 }
  ];
  
  const mealSatisfactionData = {
    overall: 84,
    byMealType: {
      breakfast: 86,
      lunch: 82,
      dinner: 85,
      snacks: 88
    },
    trend: [
      { date: '2025-10-12', value: 81 },
      { date: '2025-10-19', value: 82 },
      { date: '2025-10-26', value: 83 },
      { date: '2025-11-02', value: 84 },
      { date: '2025-11-09', value: 84 }
    ],
    topRatedMeals: [
      "Baked Salmon with Vegetables",
      "Oatmeal with Fresh Berries",
      "Chicken Vegetable Soup"
    ],
    lowestRatedMeals: [
      "Vegetable Casserole",
      "Pureed Meat with Gravy",
      "Steamed Cabbage"
    ]
  };
  
  // Helper function to render a metric card
  const renderMetricCard = (title: string, value: string | number, icon: React.ReactNode, trend: string, color: string) => (
    <div className={`bg-${color}-50 rounded-xl p-5 border border-${color}-100`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-${color}-600 font-medium`}>{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`text-${color}-500`}>{icon}</div>
      </div>
      <div className="mt-4 text-sm text-gray-600">{trend}</div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nutrition Analytics</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-500" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select 
                value={selectedDietaryType}
                onChange={(e) => setSelectedDietaryType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Dietary Types</option>
                <option value="diabetic">Diabetic</option>
                <option value="lowSodium">Low Sodium</option>
                <option value="highProtein">High Protein</option>
                <option value="softDiet">Soft Diet</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-gray-500" />
              <select 
                value={selectedResidentGroup}
                onChange={(e) => setSelectedResidentGroup(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Residents</option>
                <option value="mobility">By Mobility Level</option>
                <option value="age">By Age Group</option>
                <option value="condition">By Medical Condition</option>
              </select>
            </div>
            
            <div className="ml-auto">
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                <Download size={18} className="mr-2" />
                Export Report
              </button>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {renderMetricCard(
              "Nutrition Compliance", 
              `${nutritionComplianceData.overall}%`, 
              <Activity size={32} />, 
              "Up 5% from previous period", 
              "green"
            )}
            
            {renderMetricCard(
              "Avg. Cost Per Resident/Day", 
              `$${costData.averagePerResident}`, 
              <Utensils size={32} />, 
              "Down $0.37 from previous period", 
              "blue"
            )}
            
            {renderMetricCard(
              "Food Waste", 
              `${wasteData.overall}%`, 
              <TrendingUp size={32} className="rotate-180" />, 
              "Down 3% from previous period", 
              "amber"
            )}
            
            {renderMetricCard(
              "Meal Satisfaction", 
              `${mealSatisfactionData.overall}%`, 
              <Users size={32} />, 
              "Up 2% from previous period", 
              "purple"
            )}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Nutrition Compliance by Dietary Type</h3>
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="nutritionCompliance">Compliance %</option>
                  <option value="cost">Cost</option>
                  <option value="waste">Waste</option>
                  <option value="satisfaction">Satisfaction</option>
                </select>
              </div>
              
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                {/* In a real app, this would be a chart component */}
                <div className="text-center">
                  <BarChart size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Chart visualization would appear here</p>
                  <p className="text-sm text-gray-400">Showing {selectedMetric} data by dietary type</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Diabetic</span>
                  </div>
                  <span className="font-medium">{nutritionComplianceData.byDietaryType.diabetic}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Low Sodium</span>
                  </div>
                  <span className="font-medium">{nutritionComplianceData.byDietaryType.lowSodium}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>High Protein</span>
                  </div>
                  <span className="font-medium">{nutritionComplianceData.byDietaryType.highProtein}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Trend Analysis</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`cursor-pointer px-2 py-1 rounded ${selectedMetric === 'nutritionCompliance' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`} onClick={() => setSelectedMetric('nutritionCompliance')}>Compliance</span>
                  <span className={`cursor-pointer px-2 py-1 rounded ${selectedMetric === 'cost' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`} onClick={() => setSelectedMetric('cost')}>Cost</span>
                  <span className={`cursor-pointer px-2 py-1 rounded ${selectedMetric === 'waste' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`} onClick={() => setSelectedMetric('waste')}>Waste</span>
                </div>
              </div>
              
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                {/* In a real app, this would be a chart component */}
                <div className="text-center">
                  <TrendingUp size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Trend chart would appear here</p>
                  <p className="text-sm text-gray-400">Showing {selectedMetric} trend over time</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Oct 12</span>
                  <span>Oct 19</span>
                  <span>Oct 26</span>
                  <span>Nov 2</span>
                  <span>Nov 9</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Nutritional Deficiencies</h3>
              
              <div className="space-y-4">
                {nutritionalDeficiencies.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span>{item.nutrient}</span>
                        <span className="ml-2 text-sm text-gray-500">({item.affectedResidents} residents)</span>
                      </div>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Increase calcium-rich foods in breakfast options</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Consider vitamin D supplements for at-risk residents</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Add more high-fiber options to lunch and dinner menus</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Cost Optimization Opportunities</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Potential Monthly Savings</span>
                  <span className="text-2xl font-bold text-green-600">${costData.potentialSavings}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Findings</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Food waste accounts for approximately ${wasteData.potentialSavings} in monthly losses</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                      <span>High-protein diets cost 21% more than average</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                      <span>Dinner has the highest waste percentage (15%)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Recommendations</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Adjust portion sizes for dinner meals</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Implement batch cooking for high-cost dietary types</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={16} className="mr-2 mt-1 shrink-0" />
                    <span>Replace lowest-rated meals with cost-effective alternatives</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionAnalyticsPage;
