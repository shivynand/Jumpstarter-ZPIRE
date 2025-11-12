import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Import pages
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import FoodAnalysisPage from './pages/FoodAnalysisPage'
import RecommendationsPage from './pages/RecommendationsPage'
import CareHomePage from './pages/CareHomePage'
import CareHomeMealPlanningPage from './pages/CareHomeMealPlanningPage'
import NutritionAnalyticsPage from './pages/NutritionAnalyticsPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import CareHomeFoodAnalysisPage from './pages/CareHomeFoodAnalysisPage'
import SettingsPage from './pages/SettingsPage'
import CareHomeSettingsPage from './pages/CareHomeSettingsPage'

// Import components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HealthCheckInPopup from './components/HealthCheckInPopup'

// AppContent component to use the useLocation hook
// Main App component that uses Router
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

// AppRoutes component to use the useLocation hook
const AppRoutes = () => {
  const [showHealthCheckIn, setShowHealthCheckIn] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'individual' | 'carehome' | null>(null)
  const location = useLocation()
  
  // Determine if user is logged in and what type they are
  useEffect(() => {
    // For demo purposes, consider the user logged in if they're on certain pages
    const loggedInPages = [
      '/profile', 
      '/food-analysis', 
      '/recommendations',
      '/care-home',
      '/care-home/meal-planning',
      '/care-home/analytics',
      '/settings',
      '/care-home/settings',
      '/care-home/food-analysis'
    ]
    
    const isUserLoggedIn = loggedInPages.some(page => location.pathname.startsWith(page))
    setIsLoggedIn(isUserLoggedIn)
    
    // Determine user type based on URL
    if (location.pathname.startsWith('/care-home')) {
      setUserType('carehome')
    } else if (isUserLoggedIn) {
      setUserType('individual')
    } else {
      setUserType(null)
    }
  }, [location])
  
  // Show health check-in popup only for individual users
  useEffect(() => {
    // Only proceed if user is logged in as individual
    if (isLoggedIn && userType === 'individual') {
      console.log('Individual user detected, checking for health check-in')
      // For testing purposes, clear the localStorage to ensure popup shows
      localStorage.removeItem('lastHealthCheckIn')
      
      // Check if we've shown the health check-in today
      const lastCheckIn = localStorage.getItem('lastHealthCheckIn')
      const today = new Date().toDateString()
      console.log('Last check-in:', lastCheckIn, 'Today:', today)
      
      if (lastCheckIn !== today) {
        console.log('Showing health check-in popup in 3 seconds')
        // Show the popup after a short delay
        const timer = setTimeout(() => {
          console.log('Setting showHealthCheckIn to true')
          setShowHealthCheckIn(true)
        }, 3000)
        
        return () => clearTimeout(timer)
      }
    }
  }, [isLoggedIn, userType])
  
  const handleCloseHealthCheckIn = () => {
    setShowHealthCheckIn(false)
    // Save that we've shown the check-in today
    localStorage.setItem('lastHealthCheckIn', new Date().toDateString())
  }

  return (
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
          <Route path="/care-home/food-analysis" element={<CareHomeFoodAnalysisPage />} />
          <Route path="/care-home/settings" element={<CareHomeSettingsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
      
      {showHealthCheckIn && (
        <HealthCheckInPopup onClose={handleCloseHealthCheckIn} />
      )}
    </div>
  )
}

export default App
