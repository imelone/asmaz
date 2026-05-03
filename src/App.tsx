import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionScreen from './screens/QuestionScreen';
import ResultsScreen from './screens/ResultsScreen';
import SplashScreen from './components/SplashScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DashboardScreen from './screens/DashboardScreen';
import DoseTrackingScreen from './screens/DoseTrackingScreen';
import RemindersScreen from './screens/RemindersScreen';
import CrisisLogScreen from './screens/CrisisLogScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const userData = localStorage.getItem('userData');
    setIsRegistered(!!userData);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={isRegistered ? <DashboardScreen /> : <RegistrationScreen />} />
          <Route path="/registration" element={<RegistrationScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/act" element={<QuestionScreen questionNumber={1} />} />
          <Route path="/question/2" element={<QuestionScreen questionNumber={2} />} />
          <Route path="/question/3" element={<QuestionScreen questionNumber={3} />} />
          <Route path="/question/4" element={<QuestionScreen questionNumber={4} />} />
          <Route path="/question/5" element={<QuestionScreen questionNumber={5} />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/doses" element={<DoseTrackingScreen />} />
          <Route path="/crisis" element={<CrisisLogScreen />} />
          <Route path="/reminders" element={<RemindersScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
