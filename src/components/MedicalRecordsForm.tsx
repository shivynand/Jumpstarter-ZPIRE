import { useState } from 'react';
import { Plus, Trash2, FileText, AlertCircle } from 'lucide-react';

interface MedicalCondition {
  id: string;
  condition: string;
  diagnosisDate: string;
  medications: string;
  dietaryImplications: string;
  notes: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  foodInteractions: string;
  startDate: string;
}

interface MedicalRecordsFormProps {
  onSave: (data: {
    conditions: MedicalCondition[];
    medications: Medication[];
    allergies: string[];
    recentHospitalizations: string;
    primaryPhysician: string;
    bloodType: string;
    additionalNotes: string;
  }) => void;
}

const MedicalRecordsForm = ({ onSave }: MedicalRecordsFormProps) => {
  const [conditions, setConditions] = useState<MedicalCondition[]>([
    {
      id: '1',
      condition: '',
      diagnosisDate: '',
      medications: '',
      dietaryImplications: '',
      notes: ''
    }
  ]);
  
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: '',
      purpose: '',
      foodInteractions: '',
      startDate: ''
    }
  ]);
  
  const [allergies, setAllergies] = useState<string[]>(['']);
  const [recentHospitalizations, setRecentHospitalizations] = useState('');
  const [primaryPhysician, setPrimaryPhysician] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        condition: '',
        diagnosisDate: '',
        medications: '',
        dietaryImplications: '',
        notes: ''
      }
    ]);
  };
  
  const handleRemoveCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(condition => condition.id !== id));
    }
  };
  
  const handleConditionChange = (id: string, field: keyof MedicalCondition, value: string) => {
    setConditions(
      conditions.map(condition => 
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };
  
  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: Date.now().toString(),
        name: '',
        dosage: '',
        frequency: '',
        purpose: '',
        foodInteractions: '',
        startDate: ''
      }
    ]);
  };
  
  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(medication => medication.id !== id));
    }
  };
  
  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(
      medications.map(medication => 
        medication.id === id ? { ...medication, [field]: value } : medication
      )
    );
  };
  
  const handleAddAllergy = () => {
    setAllergies([...allergies, '']);
  };
  
  const handleRemoveAllergy = (index: number) => {
    if (allergies.length > 1) {
      setAllergies(allergies.filter((_, i) => i !== index));
    }
  };
  
  const handleAllergyChange = (index: number, value: string) => {
    setAllergies(
      allergies.map((allergy, i) => i === index ? value : allergy)
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      conditions,
      medications,
      allergies,
      recentHospitalizations,
      primaryPhysician,
      bloodType,
      additionalNotes
    });
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <FileText size={24} className="text-blue-600 mr-2" />
        <h2 className="text-2xl font-semibold">Medical Records</h2>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <AlertCircle size={24} className="text-blue-600 mr-2 shrink-0" />
          <div>
            <p className="text-blue-700 font-medium">Why we need this information</p>
            <p className="text-blue-600">
              Your medical information helps us provide more accurate nutritional recommendations 
              tailored to your specific health needs. This information is kept private and secure.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Medical Conditions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Medical Conditions</h3>
          
          {conditions.map((condition, index) => (
            <div 
              key={condition.id} 
              className="border rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">Condition {index + 1}</h4>
                <button 
                  type="button"
                  onClick={() => handleRemoveCondition(condition.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={conditions.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-lg mb-2" htmlFor={`condition-${condition.id}`}>
                    Condition Name
                  </label>
                  <input
                    type="text"
                    id={`condition-${condition.id}`}
                    value={condition.condition}
                    onChange={(e) => handleConditionChange(condition.id, 'condition', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Diabetes, Hypertension"
                  />
                </div>
                
                <div>
                  <label className="block text-lg mb-2" htmlFor={`diagnosis-date-${condition.id}`}>
                    Diagnosis Date
                  </label>
                  <input
                    type="date"
                    id={`diagnosis-date-${condition.id}`}
                    value={condition.diagnosisDate}
                    onChange={(e) => handleConditionChange(condition.id, 'diagnosisDate', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor={`medications-${condition.id}`}>
                  Related Medications
                </label>
                <input
                  type="text"
                  id={`medications-${condition.id}`}
                  value={condition.medications}
                  onChange={(e) => handleConditionChange(condition.id, 'medications', e.target.value)}
                  className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List medications taken for this condition"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor={`dietary-${condition.id}`}>
                  Dietary Implications
                </label>
                <textarea
                  id={`dietary-${condition.id}`}
                  value={condition.dietaryImplications}
                  onChange={(e) => handleConditionChange(condition.id, 'dietaryImplications', e.target.value)}
                  className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="How does this condition affect diet? (e.g., low sodium, sugar restrictions)"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2" htmlFor={`notes-${condition.id}`}>
                  Additional Notes
                </label>
                <textarea
                  id={`notes-${condition.id}`}
                  value={condition.notes}
                  onChange={(e) => handleConditionChange(condition.id, 'notes', e.target.value)}
                  className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Any other important information about this condition"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddCondition}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus size={20} className="mr-1" />
            Add Another Condition
          </button>
        </div>
        
        {/* Medications Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Medications</h3>
          
          {medications.map((medication, index) => (
            <div 
              key={medication.id} 
              className="border rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">Medication {index + 1}</h4>
                <button 
                  type="button"
                  onClick={() => handleRemoveMedication(medication.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={medications.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-lg mb-2" htmlFor={`med-name-${medication.id}`}>
                    Medication Name
                  </label>
                  <input
                    type="text"
                    id={`med-name-${medication.id}`}
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(medication.id, 'name', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Metformin, Lisinopril"
                  />
                </div>
                
                <div>
                  <label className="block text-lg mb-2" htmlFor={`dosage-${medication.id}`}>
                    Dosage
                  </label>
                  <input
                    type="text"
                    id={`dosage-${medication.id}`}
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(medication.id, 'dosage', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500mg, 10mg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-lg mb-2" htmlFor={`frequency-${medication.id}`}>
                    Frequency
                  </label>
                  <input
                    type="text"
                    id={`frequency-${medication.id}`}
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(medication.id, 'frequency', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Once daily, Twice daily with meals"
                  />
                </div>
                
                <div>
                  <label className="block text-lg mb-2" htmlFor={`start-date-${medication.id}`}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`start-date-${medication.id}`}
                    value={medication.startDate}
                    onChange={(e) => handleMedicationChange(medication.id, 'startDate', e.target.value)}
                    className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor={`purpose-${medication.id}`}>
                  Purpose
                </label>
                <input
                  type="text"
                  id={`purpose-${medication.id}`}
                  value={medication.purpose}
                  onChange={(e) => handleMedicationChange(medication.id, 'purpose', e.target.value)}
                  className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What condition is this medication treating?"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2" htmlFor={`food-interactions-${medication.id}`}>
                  Food Interactions
                </label>
                <textarea
                  id={`food-interactions-${medication.id}`}
                  value={medication.foodInteractions}
                  onChange={(e) => handleMedicationChange(medication.id, 'foodInteractions', e.target.value)}
                  className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Any foods to avoid or include with this medication?"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddMedication}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus size={20} className="mr-1" />
            Add Another Medication
          </button>
        </div>
        
        {/* Allergies Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Allergies</h3>
          
          {allergies.map((allergy, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={allergy}
                onChange={(e) => handleAllergyChange(index, e.target.value)}
                className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Penicillin, Shellfish, Peanuts"
              />
              <button 
                type="button"
                onClick={() => handleRemoveAllergy(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                disabled={allergies.length === 1}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddAllergy}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus size={20} className="mr-1" />
            Add Another Allergy
          </button>
        </div>
        
        {/* Additional Medical Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Additional Medical Information</h3>
          
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="recent-hospitalizations">
              Recent Hospitalizations
            </label>
            <textarea
              id="recent-hospitalizations"
              value={recentHospitalizations}
              onChange={(e) => setRecentHospitalizations(e.target.value)}
              className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Any hospitalizations in the past year? Include dates and reasons."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-lg mb-2" htmlFor="primary-physician">
                Primary Physician
              </label>
              <input
                type="text"
                id="primary-physician"
                value={primaryPhysician}
                onChange={(e) => setPrimaryPhysician(e.target.value)}
                className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name and contact information"
              />
            </div>
            
            <div>
              <label className="block text-lg mb-2" htmlFor="blood-type">
                Blood Type
              </label>
              <select
                id="blood-type"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-lg mb-2" htmlFor="additional-notes">
              Additional Notes
            </label>
            <textarea
              id="additional-notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full text-lg py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Any other medical information that might be relevant for nutritional recommendations"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md text-xl"
          >
            Save Medical Records
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalRecordsForm;
