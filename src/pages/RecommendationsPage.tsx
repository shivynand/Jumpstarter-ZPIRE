import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';

const RecommendationsPage = () => {
  const [activeTab, setActiveTab] = useState('daily');
  
  // Mock data for recommendations
  const recommendations = {
    daily: [
      {
        id: 1,
        title: "Increase Calcium Intake",
        description: "Your calcium levels are below the recommended amount for your age group.",
        suggestions: [
          "Add a serving of low-fat dairy to your breakfast",
          "Include leafy greens like kale or spinach in your lunch",
          "Consider calcium-fortified orange juice as a beverage option"
        ],
        priority: "high"
      },
      {
        id: 2,
        title: "Reduce Sodium Consumption",
        description: "Your recent meals have been high in sodium, which can affect your blood pressure.",
        suggestions: [
          "Use herbs and spices instead of salt for flavoring",
          "Choose fresh foods over processed options",
          "Rinse canned vegetables and beans before cooking"
        ],
        priority: "medium"
      },
      {
        id: 3,
        title: "Add More Fiber",
        description: "Increasing fiber can help with digestion and maintain healthy cholesterol levels.",
        suggestions: [
          "Include whole grains like oatmeal or brown rice",
          "Add beans or lentils to soups and salads",
          "Eat fruits with the skin when possible (like apples)"
        ],
        priority: "high"
      }
    ],
    weekly: [
      {
        id: 4,
        title: "Balance Your Protein Sources",
        description: "Try to include a variety of protein sources throughout the week.",
        suggestions: [
          "Include fish at least twice a week",
          "Try plant-based proteins like tofu or tempeh",
          "Include lean poultry and limit red meat"
        ],
        priority: "medium"
      },
      {
        id: 5,
        title: "Hydration Reminder",
        description: "Your water intake has been lower than recommended this week.",
        suggestions: [
          "Keep a water bottle with you throughout the day",
          "Set reminders to drink water every hour",
          "Include hydrating foods like cucumber and watermelon"
        ],
        priority: "high"
      }
    ],
    monthly: [
      {
        id: 6,
        title: "Vitamin D Levels",
        description: "Your vitamin D levels could be improved with more sun exposure and dietary sources.",
        suggestions: [
          "Spend 15-20 minutes in morning sunlight when possible",
          "Include fatty fish like salmon in your diet",
          "Consider vitamin D fortified foods like certain cereals"
        ],
        priority: "medium"
      },
      {
        id: 7,
        title: "Meal Variety",
        description: "Try to increase the variety of foods in your diet for better nutrient balance.",
        suggestions: [
          "Try one new vegetable or fruit each week",
          "Experiment with different whole grains",
          "Include a variety of colors on your plate at each meal"
        ],
        priority: "low"
      }
    ]
  };

  const handleFeedback = (id: number, type: 'helpful' | 'unhelpful') => {
    console.log(`Recommendation ${id} marked as ${type}`);
    // In a real app, this would send feedback to the server
    alert(`Thank you for your feedback!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Recommendations</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b">
          <TabButton 
            label="Daily" 
            active={activeTab === 'daily'} 
            onClick={() => setActiveTab('daily')} 
          />
          <TabButton 
            label="Weekly" 
            active={activeTab === 'weekly'} 
            onClick={() => setActiveTab('weekly')} 
          />
          <TabButton 
            label="Monthly" 
            active={activeTab === 'monthly'} 
            onClick={() => setActiveTab('monthly')} 
          />
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {recommendations[activeTab as keyof typeof recommendations].map((rec) => (
              <RecommendationCard 
                key={rec.id}
                recommendation={rec}
                onFeedback={handleFeedback}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, active, onClick }: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-6 text-lg font-medium ${
        active 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );
};

const RecommendationCard = ({ 
  recommendation, 
  onFeedback 
}: { 
  recommendation: {
    id: number;
    title: string;
    description: string;
    suggestions: string[];
    priority: string;
  }; 
  onFeedback: (id: number, type: 'helpful' | 'unhelpful') => void;
}) => {
  const { id, title, description, suggestions, priority } = recommendation;
  
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[priority as keyof typeof priorityColors]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </span>
      </div>
      
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-2">
          <Info size={20} className="text-blue-600 mr-2" />
          <span className="font-medium">Suggestions:</span>
        </div>
        <ul className="list-disc pl-10 space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button 
          onClick={() => onFeedback(id, 'helpful')}
          className="flex items-center text-gray-600 hover:text-green-600"
        >
          <ThumbsUp size={20} className="mr-1" />
          <span>Helpful</span>
        </button>
        <button 
          onClick={() => onFeedback(id, 'unhelpful')}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <ThumbsDown size={20} className="mr-1" />
          <span>Not Helpful</span>
        </button>
      </div>
    </div>
  );
};

export default RecommendationsPage;
