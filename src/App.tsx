import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import pages
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import FoodAnalysisPage from './pages/FoodAnalysisPage'
import RecommendationsPage from './pages/RecommendationsPage'
import CareHomePage from './pages/CareHomePage'
import CareHomeMealPlanningPage from './pages/CareHomeMealPlanningPage'
import NutritionAnalyticsPage from './pages/NutritionAnalyticsPage'

// Import components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HealthCheckInPopup from './components/HealthCheckInPopup'

function App() {
  const [showHealthCheckIn, setShowHealthCheckIn] = useState(false)
  
  useEffect(() => {
    // Check if we've shown the health check-in today
    const lastCheckIn = localStorage.getItem('lastHealthCheckIn')
    const today = new Date().toDateString()
    
    if (lastCheckIn !== today) {
      // Show the popup after a short delay
      const timer = setTimeout(() => {
        setShowHealthCheckIn(true)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])
  
  const handleCloseHealthCheckIn = () => {
    setShowHealthCheckIn(false)
    // Save that we've shown the check-in today
    localStorage.setItem('lastHealthCheckIn', new Date().toDateString())
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/food-analysis" element={<FoodAnalysisPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/care-home" element={<CareHomePage />} />
            <Route path="/care-home/meal-planning" element={<CareHomeMealPlanningPage />} />
            <Route path="/care-home/analytics" element={<NutritionAnalyticsPage />} />
          </Routes>
        </main>
        <Footer />
        
        {showHealthCheckIn && (
          <HealthCheckInPopup onClose={handleCloseHealthCheckIn} />
        )}
      </div>
    </Router>
  )
}

export default App
