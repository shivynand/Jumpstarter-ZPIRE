import { useState, useRef } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, Info, Heart, Upload, Save, User, Search } from 'lucide-react';

// Mock user profile and medical records for demonstration
const mockResidents = [
  {
    id: 1,
    name: "Eleanor Johnson",
    age: 78,
    room: "103A",
    healthStatus: "Stable",
    dietaryNeeds: "Low sodium, Diabetic",
    allergies: ["Shellfish"],
    medicalConditions: [
      { condition: "Type 2 Diabetes", dietaryImplications: "Monitor carbohydrate intake, limit added sugars" },
      { condition: "Hypertension", dietaryImplications: "Reduce sodium intake, increase potassium-rich foods" },
      { condition: "Osteoporosis", dietaryImplications: "Ensure adequate calcium and vitamin D intake" }
    ]
  },
  {
    id: 2,
    name: "Robert Williams",
    age: 82,
    room: "105B",
    healthStatus: "Stable",
    dietaryNeeds: "Low sodium, Soft diet",
    allergies: ["Peanuts"],
    medicalConditions: [
      { condition: "Hypertension", dietaryImplications: "Reduce sodium intake, increase potassium-rich foods" },
      { condition: "Dysphagia", dietaryImplications: "Soft foods, thickened liquids" }
    ]
  },
  {
    id: 3,
    name: "Thomas Brown",
    age: 75,
    room: "107C",
    healthStatus: "Stable",
    dietaryNeeds: "Pureed foods, Thickened liquids",
    allergies: ["Dairy"],
    medicalConditions: [
      { condition: "Parkinson's Disease", dietaryImplications: "Easy to swallow foods, high calorie" },
      { condition: "Lactose Intolerance", dietaryImplications: "Avoid dairy products" }
    ]
  }
];

const CareHomeFoodAnalysisPage = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedResident, setSelectedResident] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mealName, setMealName] = useState('');
  const [savedMeals, setSavedMeals] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleTakePhoto = () => {
    // In a real app, this would access the device camera
    // For now, we'll use the provided spaghetti bolognese image
    setPhoto('https://www.eatalianwithroberto.com/wp-content/uploads/2023/01/Spaghetti-alla-bolognese-enjoy.jpg');
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysis({
        foodName: 'Spaghetti Bolognese',
        calories: 670,
        protein: 30,
        carbs: 78,
        fat: 22,
        fiber: 5,
        sodium: 850,
        potassium: 450,
        calcium: 120,
        vitaminD: 2,
        sugarContent: 8,
        glycemicIndex: 'Medium-High',
        personalizedRecommendations: [
          {
            type: 'warning',
            text: 'This pasta dish is high in sodium (850mg), which may affect residents with hypertension.',
            relatedCondition: 'Hypertension'
          },
          {
            type: 'warning',
            text: 'The carbohydrate content (78g) is high for diabetic residents. Consider a smaller portion or whole grain pasta alternative.',
            relatedCondition: 'Type 2 Diabetes'
          },
          {
            type: 'positive',
            text: 'Good protein content (30g) which is beneficial for maintaining muscle mass, especially important for residents with limited mobility.',
            relatedCondition: 'Limited mobility'
          },
          {
            type: 'warning',
            text: 'Low in calcium (120mg) which is important for residents with osteoporosis. Consider adding a side of dairy or calcium-rich vegetables.',
            relatedCondition: 'Osteoporosis'
          }
        ],
        nutritionRanking: [
          { name: "Protein", value: 30, target: "25-30g", importance: "high", personalized: true },
          { name: "Fiber", value: 5, target: "10-15g", importance: "high", personalized: true },
          { name: "Calcium", value: 120, target: "1200mg", importance: "high", personalized: true },
          { name: "Sodium", value: 850, target: "<500mg", importance: "high", personalized: true },
          { name: "Carbohydrates", value: 78, target: "45-60g", importance: "high", personalized: true }
        ],
        alternativeSuggestions: [
          "Replace regular pasta with whole grain pasta to lower the glycemic index for better blood sugar management",
          "Add leafy greens like spinach to increase calcium intake for osteoporosis management",
          "Use less salt and more herbs in the sauce to reduce sodium content for hypertension management",
          "Add a side of broccoli or other high-fiber vegetables to increase fiber intake"
        ],
        dietaryCompatibility: [
          { diet: "Low Sodium", compatible: false, reason: "High sodium content (850mg)" },
          { diet: "Diabetic", compatible: false, reason: "High carbohydrate content (78g)" },
          { diet: "Soft Diet", compatible: true, reason: "Texture is appropriate" },
          { diet: "Pureed Diet", compatible: false, reason: "Needs to be pureed" },
          { diet: "Vegetarian", compatible: false, reason: "Contains meat" }
        ]
      });
    }, 2000);
  };
  
  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
      setAnalyzing(true);
      
      // Simulate analysis delay
      setTimeout(() => {
        setAnalyzing(false);
        // Use the same mock analysis data for demonstration
        setAnalysis({
          foodName: 'Spaghetti Bolognese',
          calories: 670,
          protein: 30,
          carbs: 78,
          fat: 22,
          fiber: 5,
          sodium: 850,
          potassium: 450,
          calcium: 120,
          vitaminD: 2,
          sugarContent: 8,
          glycemicIndex: 'Medium-High',
          personalizedRecommendations: [
            {
              type: 'warning',
              text: 'This pasta dish is high in sodium (850mg), which may affect residents with hypertension.',
              relatedCondition: 'Hypertension'
            },
            {
              type: 'warning',
              text: 'The carbohydrate content (78g) is high for diabetic residents. Consider a smaller portion or whole grain pasta alternative.',
              relatedCondition: 'Type 2 Diabetes'
            },
            {
              type: 'positive',
              text: 'Good protein content (30g) which is beneficial for maintaining muscle mass, especially important for residents with limited mobility.',
              relatedCondition: 'Limited mobility'
            },
            {
              type: 'warning',
              text: 'Low in calcium (120mg) which is important for residents with osteoporosis. Consider adding a side of dairy or calcium-rich vegetables.',
              relatedCondition: 'Osteoporosis'
            }
          ],
          nutritionRanking: [
            { name: "Protein", value: 30, target: "25-30g", importance: "high", personalized: true },
            { name: "Fiber", value: 5, target: "10-15g", importance: "high", personalized: true },
            { name: "Calcium", value: 120, target: "1200mg", importance: "high", personalized: true },
            { name: "Sodium", value: 850, target: "<500mg", importance: "high", personalized: true },
            { name: "Carbohydrates", value: 78, target: "45-60g", importance: "high", personalized: true }
          ],
          alternativeSuggestions: [
            "Replace regular pasta with whole grain pasta to lower the glycemic index for better blood sugar management",
            "Add leafy greens like spinach to increase calcium intake for osteoporosis management",
            "Use less salt and more herbs in the sauce to reduce sodium content for hypertension management",
            "Add a side of broccoli or other high-fiber vegetables to increase fiber intake"
          ],
          dietaryCompatibility: [
            { diet: "Low Sodium", compatible: false, reason: "High sodium content (850mg)" },
            { diet: "Diabetic", compatible: false, reason: "High carbohydrate content (78g)" },
            { diet: "Soft Diet", compatible: true, reason: "Texture is appropriate" },
            { diet: "Pureed Diet", compatible: false, reason: "Needs to be pureed" },
            { diet: "Vegetarian", compatible: false, reason: "Contains meat" }
          ]
        });
      }, 2000);
    }
  };
  
  const handleReset = () => {
    setPhoto(null);
    setAnalysis(null);
    setSelectedResident(null);
    setMealName('');
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSaveMeal = () => {
    if (!mealName.trim()) {
      alert('Please enter a meal name');
      return;
    }
    
    const newMeal = {
      id: Date.now(),
      name: mealName,
      photo: photo,
      analysis: analysis,
      date: new Date().toISOString(),
      residentId: selectedResident
    };
    
    setSavedMeals([...savedMeals, newMeal]);
    alert('Meal saved successfully!');
  };
  
  const filteredResidents = mockResidents.filter(resident => 
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getSelectedResident = () => {
    return mockResidents.find(resident => resident.id === selectedResident);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Care Home Food Analysis</h1>
      
      {!photo ? (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Analyze Meal for Residents</h2>
          <p className="text-lg mb-8">
            Take a photo of a meal to analyze its nutritional content and compatibility with resident dietary needs.
          </p>
          
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">Select Resident (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search residents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mt-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
              {filteredResidents.length > 0 ? (
                filteredResidents.map(resident => (
                  <div 
                    key={resident.id}
                    className={`p-3 border-b last:border-b-0 cursor-pointer ${selectedResident === resident.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedResident(resident.id)}
                  >
                    <div className="flex items-center">
                      <User className="text-gray-400 mr-2" size={20} />
                      <div>
                        <p className="font-medium">{resident.name}</p>
                        <p className="text-sm text-gray-600">Room: {resident.room} | Dietary: {resident.dietaryNeeds}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-500 text-center">No residents found</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <button 
              onClick={handleTakePhoto}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center w-full md:w-auto"
            >
              <Camera className="mr-2" size={24} />
              Take Photo
            </button>
            
            <div className="relative w-full md:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadPhoto}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center w-full relative"
              >
                <Upload className="mr-2" size={24} />
                Upload Photo
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2 text-center">
            For best results, ensure the meal is clearly visible and well-lit.
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
          {analyzing ? (
            <div className="text-center py-8">
              <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
              <h2 className="text-2xl font-semibold">Analyzing meal...</h2>
              <p className="text-lg text-gray-600 mt-2">
                This will take just a moment
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{analysis.foodName}</h2>
                  {selectedResident && (
                    <p className="text-gray-600">Analysis for resident: {getSelectedResident()?.name}</p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={handleReset}
                    className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm"
                  >
                    Analyze Another Meal
                  </button>
                  <button 
                    onClick={handleSaveMeal}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center"
                  >
                    <Save className="mr-2" size={18} />
                    Save Meal
                  </button>
                </div>
              </div>
              
              {/* Meal name input for saving */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Meal Name</label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Enter a name for this meal"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <img 
                    src={photo} 
                    alt="Meal" 
                    className="w-full h-auto rounded-lg shadow-sm mb-4"
                  />
                  
                  {selectedResident && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Resident Dietary Profile</h4>
                      <ul className="text-blue-700 space-y-1">
                        {getSelectedResident()?.medicalConditions.map((condition, index) => (
                          <li key={index}>{condition.condition}</li>
                        ))}
                        <li>Dietary Needs: {getSelectedResident()?.dietaryNeeds}</li>
                        <li>Allergies: {getSelectedResident()?.allergies.join(', ')}</li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Calories</span>
                      <span className="font-medium text-lg">{analysis.calories} kcal</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Protein</span>
                      <span className="font-medium text-lg">{analysis.protein}g</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Carbohydrates</span>
                      <span className="font-medium text-lg">{analysis.carbs}g</span>
                      <span className="text-xs text-gray-500 block">Sugar: {analysis.sugarContent}g</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Fat</span>
                      <span className="font-medium text-lg">{analysis.fat}g</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Fiber</span>
                      <span className="font-medium text-lg">{analysis.fiber}g</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Sodium</span>
                      <span className="font-medium text-lg">{analysis.sodium}mg</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Calcium</span>
                      <span className="font-medium text-lg">{analysis.calcium}mg</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="block text-gray-500 text-sm">Glycemic Index</span>
                      <span className="font-medium text-lg">{analysis.glycemicIndex}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Dietary Compatibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.dietaryCompatibility.map((item: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${
                        item.compatible 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {item.compatible ? (
                          <Check className="text-green-500 mr-2" size={20} />
                        ) : (
                          <AlertCircle className="text-red-500 mr-2" size={20} />
                        )}
                        <h4 className="font-medium">{item.diet}</h4>
                      </div>
                      <p className={`text-sm ${item.compatible ? 'text-green-700' : 'text-red-700'}`}>
                        {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Nutritional Insights</h3>
                <div className="space-y-4">
                  {analysis.personalizedRecommendations.map((rec: any, index: number) => (
                    <div key={index} className={`border-l-4 p-4 rounded-r-lg ${rec.type === 'warning' ? 'border-amber-500 bg-amber-50' : rec.type === 'positive' ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}`}>
                      <div className="flex">
                        {rec.type === 'warning' && <AlertCircle className="text-amber-500 mr-2 shrink-0" size={20} />}
                        {rec.type === 'positive' && <Check className="text-green-500 mr-2 shrink-0" size={20} />}
                        {rec.type === 'info' && <Info className="text-blue-500 mr-2 shrink-0" size={20} />}
                        <div>
                          <p className="text-gray-800">{rec.text}</p>
                          <span className="text-sm font-medium mt-1 inline-block px-2 py-0.5 rounded-full bg-white bg-opacity-50">
                            Related to: {rec.relatedCondition}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center">
                    <Heart className="mr-2" size={20} />
                    Suggested Modifications
                  </h4>
                  <ul className="space-y-3">
                    {analysis.alternativeSuggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-600 mr-2 mt-1 shrink-0" size={20} />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Saved Meals Section */}
      {savedMeals.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Saved Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={meal.photo || ''} 
                    alt={meal.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{meal.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {meal.analysis.calories} calories, {meal.analysis.protein}g protein
                  </p>
                  {meal.residentId && (
                    <p className="text-sm text-blue-600">
                      For: {mockResidents.find(r => r.id === meal.residentId)?.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Saved on {new Date(meal.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareHomeFoodAnalysisPage;
