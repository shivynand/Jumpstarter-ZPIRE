import { useState } from 'react';
import { X } from 'lucide-react';

interface HealthCheckInPopupProps {
  onClose: () => void;
}

const HealthCheckInPopup = ({ onClose }: HealthCheckInPopupProps) => {
  const [feeling, setFeeling] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [appetite, setAppetite] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save health check-in data
    console.log('Health check-in:', { feeling, symptoms, appetite });
    onClose();
  };
  
  const feelingOptions = [
    { value: 'great', label: 'Great', emoji: '😀' },
    { value: 'good', label: 'Good', emoji: '🙂' },
    { value: 'okay', label: 'Okay', emoji: '😐' },
    { value: 'notWell', label: 'Not Well', emoji: '😕' },
    { value: 'poor', label: 'Poor', emoji: '😞' }
  ];
  
  const symptomOptions = [
    'Fatigue', 'Headache', 'Joint Pain', 'Stomach Discomfort',
    'Poor Sleep', 'Dizziness', 'Loss of Appetite', 'None'
  ];
  
  const appetiteOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];
  
  const toggleSymptom = (symptom: string) => {
    if (symptom === 'None') {
      setSymptoms(['None']);
      return;
    }
    
    if (symptoms.includes('None')) {
      setSymptoms([symptom]);
      return;
    }
    
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">How are you feeling today?</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Overall, how are you feeling?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {feelingOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFeeling(option.value)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                    feeling === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-4xl mb-2">{option.emoji}</span>
                  <span className="text-lg">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Are you experiencing any symptoms?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {symptomOptions.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-3 rounded-lg border ${
                    symptoms.includes(symptom) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">How is your appetite today?</h3>
            <div className="grid grid-cols-2 gap-4">
              {appetiteOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAppetite(option.value)}
                  className={`p-4 rounded-lg border-2 ${
                    appetite === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md"
              disabled={!feeling || symptoms.length === 0 || !appetite}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthCheckInPopup;
