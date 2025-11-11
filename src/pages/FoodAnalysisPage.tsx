import { useState } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, Info, Heart } from 'lucide-react';

// Mock user profile and medical records for demonstration
const mockUserProfile = {
  name: 'Eleanor Johnson',
  age: '78',
  medicalConditions: [
    { condition: 'Type 2 Diabetes', dietaryImplications: 'Monitor carbohydrate intake, limit added sugars' },
    { condition: 'Hypertension', dietaryImplications: 'Reduce sodium intake, increase potassium-rich foods' },
    { condition: 'Osteoporosis', dietaryImplications: 'Ensure adequate calcium and vitamin D intake' }
  ],
  medications: [
    { name: 'Metformin', foodInteractions: 'Take with meals to reduce GI side effects' },
    { name: 'Lisinopril', foodInteractions: 'Avoid high-potassium foods like bananas and oranges' },
    { name: 'Simvastatin', foodInteractions: 'Avoid grapefruit juice; take in the evening' }
  ],
  allergies: ['Shellfish'],
  dietaryRestrictions: 'Low sodium, moderate carbohydrates',
  mobilityLevel: 'Limited mobility',
  recentBloodWork: {
    glucose: 'Slightly elevated',
    cholesterol: 'Within normal range',
    sodium: 'High normal'
  }
};

const FoodAnalysisPage = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  
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
            text: 'This pasta dish is high in sodium (850mg), which may affect your hypertension. Your dietary restriction indicates low sodium is needed.',
            relatedCondition: 'Hypertension'
          },
          {
            type: 'warning',
            text: 'The carbohydrate content (78g) is high for your diabetes management. Consider a smaller portion or whole grain pasta alternative.',
            relatedCondition: 'Type 2 Diabetes'
          },
          {
            type: 'positive',
            text: 'Good protein content (30g) which is beneficial for maintaining muscle mass, especially important with your limited mobility.',
            relatedCondition: 'Limited mobility'
          },
          {
            type: 'warning',
            text: 'Low in calcium (120mg) which is important for your osteoporosis. Consider adding a side of dairy or calcium-rich vegetables.',
            relatedCondition: 'Osteoporosis'
          },
          {
            type: 'info',
            text: 'Take your Metformin with this meal to reduce gastrointestinal side effects.',
            relatedCondition: 'Medication'
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
        ]
      });
    }, 2000);
  };
  
  const handleReset = () => {
    setPhoto(null);
    setAnalysis(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Food Analysis</h1>
      
      {!photo ? (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Take a Photo of Your Meal</h2>
          <p className="text-lg mb-8">
            Position your plate in the center of the frame and tap the button below.
          </p>
          
          <button 
            onClick={handleTakePhoto}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center mx-auto"
          >
            <Camera className="mr-2" size={24} />
            Take Photo
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
          {analyzing ? (
            <div className="text-center py-8">
              <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
              <h2 className="text-2xl font-semibold">Analyzing your meal...</h2>
              <p className="text-lg text-gray-600 mt-2">
                This will take just a moment
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{analysis.foodName}</h2>
                  <p className="text-gray-600">Personalized analysis for {mockUserProfile.name}</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm text-base"
                >
                  Analyze Another Meal
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <img 
                    src={photo} 
                    alt="Your meal" 
                    className="w-full h-auto rounded-lg shadow-sm mb-4"
                  />
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Your Health Context</h4>
                    <ul className="text-blue-700 space-y-1">
                      {mockUserProfile.medicalConditions.map((condition, index) => (
                        <li key={index}>{condition.condition}</li>
                      ))}
                      <li>Dietary Needs: {mockUserProfile.dietaryRestrictions}</li>
                      <li>Mobility: {mockUserProfile.mobilityLevel}</li>
                    </ul>
                  </div>
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
                <h3 className="text-xl font-semibold mb-4">Personalized Health Insights</h3>
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
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Nutrients to Monitor for Your Health</h3>
                <div className="space-y-4">
                  {analysis.nutritionRanking.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-medium">{item.name}</span>
                        <span className={`px-2 py-1 rounded text-sm ${parseInt(item.value) >= parseInt(item.target.replace(/[^0-9]/g, '')) ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {item.value} / {item.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={parseInt(item.value) >= parseInt(item.target.replace(/[^0-9]/g, '')) ? "bg-green-600 h-2.5 rounded-full" : "bg-amber-500 h-2.5 rounded-full"}
                          style={{ width: `${Math.min(100, (parseInt(item.value) / parseInt(item.target.replace(/[^0-9]/g, '')) * 100))}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm">
                        {item.name === "Sodium" && "Important to monitor for your hypertension"}
                        {item.name === "Carbohydrates" && "Important to monitor for your diabetes"}
                        {item.name === "Calcium" && "Important for your osteoporosis management"}
                        {item.name === "Protein" && "Helps maintain muscle mass with your limited mobility"}
                        {item.name === "Fiber" && "Helps regulate blood sugar for diabetes management"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center">
                    <Heart className="mr-2" size={20} />
                    Suggested Modifications for Your Health Needs
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
    </div>
  );
};

export default FoodAnalysisPage;
