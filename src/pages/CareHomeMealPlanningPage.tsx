import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';

const CareHomeMealPlanningPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealType, setMealType] = useState('all');
  
  // Mock data for meal plans
  const mealPlans = [
    {
      id: 1,
      date: '2025-11-12',
      mealType: 'breakfast',
      name: 'Oatmeal with Berries',
      description: 'Whole grain oatmeal with mixed berries and a touch of honey',
      nutritionInfo: 'High fiber, moderate protein, low sodium',
      dietaryTags: ['Vegetarian', 'Low Sodium', 'High Fiber']
    },
    {
      id: 2,
      date: '2025-11-12',
      mealType: 'lunch',
      name: 'Grilled Chicken Salad',
      description: 'Mixed greens with grilled chicken, cherry tomatoes, cucumber, and light vinaigrette',
      nutritionInfo: 'High protein, low carb, moderate fat',
      dietaryTags: ['Gluten-Free', 'High Protein']
    },
    {
      id: 3,
      date: '2025-11-12',
      mealType: 'dinner',
      name: 'Baked Salmon with Vegetables',
      description: 'Oven-baked salmon fillet with steamed broccoli and carrots',
      nutritionInfo: 'High in omega-3, moderate protein, low carb',
      dietaryTags: ['Gluten-Free', 'Dairy-Free', 'High Omega-3']
    },
    {
      id: 4,
      date: '2025-11-13',
      mealType: 'breakfast',
      name: 'Whole Grain Toast with Avocado',
      description: 'Whole grain toast topped with mashed avocado and a soft-boiled egg',
      nutritionInfo: 'Healthy fats, moderate protein, high fiber',
      dietaryTags: ['Vegetarian', 'High Fiber']
    }
  ];
  
  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Get meals for the current date and filter by meal type if needed
  const mealsForCurrentDate = mealPlans.filter(meal => {
    const dateMatch = meal.date === formatDate(currentDate);
    const typeMatch = mealType === 'all' || meal.mealType === mealType;
    return dateMatch && typeMatch;
  });
  
  // Navigate to previous or next day
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };
  
  // Format date for display
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Care Home Meal Planning</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button 
                onClick={() => navigateDay('prev')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex items-center mx-4">
                <Calendar size={24} className="text-blue-600 mr-2" />
                <span className="text-xl font-medium">{formatDateForDisplay(currentDate)}</span>
              </div>
              
              <button 
                onClick={() => navigateDay('next')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4">
                <label className="mr-2 text-gray-600">Filter by:</label>
                <select 
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Meals</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snacks</option>
                </select>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center">
                <Plus size={20} className="mr-1" />
                Add Meal
              </button>
            </div>
          </div>
          
          {mealsForCurrentDate.length > 0 ? (
            <div className="space-y-6">
              {mealsForCurrentDate.map((meal) => (
                <div key={meal.id} className="border rounded-lg p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="capitalize font-medium text-lg text-blue-600">
                          {meal.mealType}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                      <p className="text-gray-600 mb-3">{meal.description}</p>
                      <p className="text-gray-700 mb-3">
                        <span className="font-medium">Nutrition: </span>
                        {meal.nutritionInfo}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {meal.dietaryTags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Filter size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No meals planned for this day</h3>
              <p className="text-gray-500 mb-6">Add a meal to start planning the menu for this day.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center mx-auto">
                <Plus size={20} className="mr-1" />
                Add First Meal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareHomeMealPlanningPage;
